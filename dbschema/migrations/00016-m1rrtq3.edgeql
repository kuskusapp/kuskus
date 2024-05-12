CREATE MIGRATION m1rrtq3hl4kmitoov4f2bumnn4f2w7pfy4qae2ivztpt3d7fh3idqq
    ONTO m1mlcgumhkh5g5uncus7mqljscvj3ipajrfz6gliiceffzlevn2wuq
{
  ALTER TYPE default::Post {
      CREATE PROPERTY aiDescription: std::str;
  };
};
