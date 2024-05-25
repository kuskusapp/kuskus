CREATE MIGRATION m14zxtnlazvsewhz3s2p7ws7cko7b6cnznog36oqqabkkarhyqogtq
    ONTO m1ldosmxh2vln4xtylbzdmhg5s3syggmz3d7tkmk63r4ulgpurafca
{
  ALTER TYPE default::Post {
      ALTER PROPERTY labels {
          RENAME TO categories;
      };
  };
};
