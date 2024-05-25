CREATE MIGRATION m1ldosmxh2vln4xtylbzdmhg5s3syggmz3d7tkmk63r4ulgpurafca
    ONTO m1ixc6wjufvltkrqg7ijkrs66ycynhdfmd75hih4rd45xu5eggzvjq
{
  ALTER TYPE default::Post {
      CREATE MULTI PROPERTY labels: std::str;
  };
};
