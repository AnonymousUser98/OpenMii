
// Three.js vertex shader (PICA-compatible)

// attribute vec3 position;
// attribute vec3 normal;
attribute vec3 _color;
// attribute vec2 uv;
// attribute vec2 uv2;

// Optional, if available
attribute vec4 tangent;

// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;

// Fragment inputs
// out vec4 primary_color;
out vec2 texcoord0;
// out vec4 normquat;
out vec3 v_normal;
out vec3 view;
out vec3 v_color;
#ifdef USE_SKINNING
uniform highp sampler2D boneTexture;
uniform mat4 bindMatrix;
uniform mat4 bindMatrixInverse;
mat4 getBoneMatrix( const in float i ) {
    int size = textureSize( boneTexture, 0 ).x;
    int j = int( i ) * 4;
    int x = j % size;
    int y = j / size;
    vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
    vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
    vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
    vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
    return mat4( v1, v2, v3, v4 );
}
#endif

// Rotate Z+ to normal → quaternion
vec4 normalToQuaternion(vec3 n) {
    vec3 up = vec3(0.0, 0.0, 1.0);
    float cosTheta = dot(up, n);
    vec3 axis = cross(up, n);
    float s = sqrt((1.0 + cosTheta) * 2.0);
    return normalize(vec4(axis / s, s * 0.5));
}

// out vec3 v_viewDir;
out vec3 v_normal_view;
out vec3 v_position_view;
out vec3 v_modelPos;


void main() {
      // begin_vertex.glsl.js
    vec3 transformed = vec3( position );
    // skinbase_vertex.glsl.js
    #ifdef USE_SKINNING
        mat4 boneMatX = getBoneMatrix( skinIndex.x );
        mat4 boneMatY = getBoneMatrix( skinIndex.y );
        mat4 boneMatZ = getBoneMatrix( skinIndex.z );
        mat4 boneMatW = getBoneMatrix( skinIndex.w );
        // skinning_vertex.glsl.js
        vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
        vec4 skinned = vec4( 0.0 );
        skinned += boneMatX * skinVertex * skinWeight.x;
        skinned += boneMatY * skinVertex * skinWeight.y;
        skinned += boneMatZ * skinVertex * skinWeight.z;
        skinned += boneMatW * skinVertex * skinWeight.w;
        transformed = ( bindMatrixInverse * skinned ).xyz;
    #endif

    vec3 objectNormal = normal;
    vec3 objectTangent = tangent.xyz;
    #ifdef USE_SKINNING
    mat4 skinMatrix = mat4( 0.0 );
    skinMatrix += skinWeight.x * boneMatX;
    skinMatrix += skinWeight.y * boneMatY;
    skinMatrix += skinWeight.z * boneMatZ;
    skinMatrix += skinWeight.w * boneMatW;
    skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

    objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
    objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
    #endif

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    vec4 viewPos  = modelViewMatrix * vec4(transformed, 1.0);

    gl_Position = projectionMatrix * viewPos;
    texcoord0 = uv;

    vec3 worldNormal = normalize(normalMatrix * objectNormal);
    v_normal = worldNormal;
    v_modelPos = transformed.xyz;
    v_normal_view = worldNormal;
    v_position_view = viewPos.xyz;

    v_color = _color.rgb;
}
