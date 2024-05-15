CREATE MIGRATION m1i5ze3zet6goetnhlytbpia3votcjf2uos3zs6h75f7zn3hhg5gva
    ONTO m174ob4mj6rjtwmumb2vhrmcxmrldzcfcech22qza45mtmedola3dq
{
  ALTER TYPE default::Post {
      ALTER PROPERTY photoFileName {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
