CREATE MIGRATION m174ob4mj6rjtwmumb2vhrmcxmrldzcfcech22qza45mtmedola3dq
    ONTO m1frs5c2c5bj3s7dgvadpsrp75uqixrpmkbm5ggbrilzr5ilbcg5xa
{
  ALTER TYPE default::Post {
      CREATE PROPERTY photoFileName: std::str;
  };
};
