CREATE MIGRATION m1undprjrqbb6shl5zbnt6e2di7khx36lsfrct5lvvbmzcj3nqglpa
    ONTO m15z3slb562ggvv743d22sqfafb2lnc74yxe7kkn7kpu7dxnfan7qa
{
  ALTER TYPE default::User {
      CREATE PROPERTY githubAvatarUrl: std::str;
      CREATE PROPERTY githubUsername: std::str;
  };
};
