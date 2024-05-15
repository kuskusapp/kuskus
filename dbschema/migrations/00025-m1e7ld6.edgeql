CREATE MIGRATION m1e7ld67bx2xtiwocoioegdvh6lmx66zp7ixfms5gyjov2ikfwjpaq
    ONTO m1uxnh63ivgcmdu55ir2qgb22qwvyixkko5oqbuf3tyhvmxoveg6ca
{
  ALTER TYPE default::Post {
      ALTER PROPERTY previewBase64Hash {
          RENAME TO imagePreviewBase64Hash;
      };
  };
};
