CREATE MIGRATION m1uxnh63ivgcmdu55ir2qgb22qwvyixkko5oqbuf3tyhvmxoveg6ca
    ONTO m15r5z3ro76levn3buqewf5pzjbrqoken5a26lqkfbqtzimppytpzq
{
  ALTER TYPE default::Post {
      CREATE PROPERTY imageHeight: std::str;
  };
  ALTER TYPE default::Post {
      CREATE PROPERTY imageWidth: std::str;
  };
  ALTER TYPE default::Post {
      ALTER PROPERTY photoFileName {
          RENAME TO imageFileNameFromImport;
      };
  };
  ALTER TYPE default::Post {
      ALTER PROPERTY photoUrl {
          RENAME TO imageUrl;
      };
  };
  ALTER TYPE default::Post {
      CREATE PROPERTY previewBase64Hash: std::str;
  };
};
