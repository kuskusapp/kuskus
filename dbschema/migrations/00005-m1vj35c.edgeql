CREATE MIGRATION m1vj35cynjv4gfdbkuagwak7xqigsa5b6ntktjryebafpuefyyirsq
    ONTO m1vxea6bbbc2xoflkwohjoir3j5ducdrzsvwnjpt4fadzrhuzp26sq
{
  ALTER TYPE default::User {
      CREATE PROPERTY place: std::str;
  };
};
