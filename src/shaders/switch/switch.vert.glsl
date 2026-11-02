
// Switch Shader aka SampleShader, ported to Three.js by kat21
// Intended for use in Mii Creator, with custom edits made for it.
precision highp float;
#define VARYING_QUALIFIER out
#define VARYING_INSTANCE Out
attribute vec3 _color;

varying highp vec2 i_texCoord; 
varying highp vec3 i_normal;
varying highp float i_specularMix; 
varying highp vec3 i_modelPos;

/// ================================================================
/// 頂点シェーダーの実装
/// ================================================================
#ifdef USE_SKINNING
    uniform mat4 bindMatrix;
    uniform mat4 bindMatrixInverse;
    uniform highp sampler2D boneTexture;
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

attribute vec3 tangent;
uniform int modulateType;
uniform bool LOW;

void main()
{
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

    i_modelPos = transformed.xyz;

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
    
    i_normal = normalize(normalMatrix * objectNormal);
    i_texCoord = uv;
// Fix for android low resource causing hair to be missing
if (LOW==true) {
    i_specularMix = 0.0;
} else {
    i_specularMix = _color.r;
}
    gl_Position = projectionMatrix * mvPosition;
}