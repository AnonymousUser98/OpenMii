
attribute vec3 _color;
#ifdef USE_SKINNING
uniform highp sampler2D boneTexture;
uniform mat4 bindMatrix;
uniform mat4 bindMatrixInverse;
mat4 getBoneMatrix(const in float i) {
    int size = textureSize(boneTexture, 0).x;
    int j = int(i) * 4;
    int x = j % size;
    int y = j / size;
    vec4 v1 = texelFetch(boneTexture, ivec2(x, y), 0);
    vec4 v2 = texelFetch(boneTexture, ivec2(x + 1, y), 0);
    vec4 v3 = texelFetch(boneTexture, ivec2(x + 2, y), 0);
    vec4 v4 = texelFetch(boneTexture, ivec2(x + 3, y), 0);
    return mat4(v1, v2, v3, v4);
}
#endif
out vec2 vUv;
out vec3 v_color;
out vec3 v_modelPos;
void main() {
    vec3 transformed = vec3(position);
    #ifdef USE_SKINNING
    mat4 boneMatX = getBoneMatrix(skinIndex.x);
    mat4 boneMatY = getBoneMatrix(skinIndex.y);
    mat4 boneMatZ = getBoneMatrix(skinIndex.z);
    mat4 boneMatW = getBoneMatrix(skinIndex.w);
    vec4 skinVertex = bindMatrix * vec4(transformed, 1.0);
    vec4 skinned = vec4(0.0);
    skinned += boneMatX * skinVertex * skinWeight.x;
    skinned += boneMatY * skinVertex * skinWeight.y;
    skinned += boneMatZ * skinVertex * skinWeight.z;
    skinned += boneMatW * skinVertex * skinWeight.w;
    transformed = (bindMatrixInverse * skinned).xyz;
    #endif

    v_modelPos = transformed.xyz;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);

    vUv = uv;
    v_color = _color;

    gl_Position = projectionMatrix * mvPosition;
}