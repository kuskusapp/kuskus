CREATE MIGRATION m1vxea6bbbc2xoflkwohjoir3j5ducdrzsvwnjpt4fadzrhuzp26sq
    ONTO m17um6ub374m7xymhni3eqme3vh4y6xu4dekh7qepycipzhweaqocq
{
  ALTER TYPE default::User {
      CREATE MULTI LINK createdPosts: default::Post;
  };
};
