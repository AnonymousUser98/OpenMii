
attribute vec3 tangent;
attribute vec3 _color;
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
  out vec3 v_viewDir;
  out vec3 v_normal;
  out vec3 v_modelNormal;
  out vec2 v_uv;
  out vec3 v_modelPos;
  out vec4 v_position;
  varying vec3 v_color;
  varying vec3 v_tangent;
  varying mat3 v_normalMatrix;
  
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
    
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);

    v_viewDir = -mvPosition.xyz;
    v_normal = normalize(normalMatrix * objectNormal);
    v_modelNormal = normalize(mat3(modelMatrix) * objectNormal);
    v_tangent = normalize(normalMatrix * objectTangent);
    v_color = _color;
    v_uv = uv;
    v_modelPos = transformed.xyz;
    v_normalMatrix = normalMatrix;

    v_position = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position =  projectionMatrix * v_position;
}