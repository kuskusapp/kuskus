CREATE MIGRATION m1v4j7xhql37x2ysxwddfccwyw66qbsbxonbuaotaewt5ewnpa5wca
    ONTO m17xt4cdazj2ska2apv5z56qu4ltlhxwaegnursho4e62z2b3gq2vq
{
  ALTER TYPE default::User {
      ALTER LINK createdPosts {
          USING (.<created_by[IS default::Post]);
          RESET CARDINALITY;
      };
  };
  ALTER TYPE default::User {
      DROP LINK followingPlaces;
  };
};
