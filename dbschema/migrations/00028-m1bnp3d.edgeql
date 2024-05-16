CREATE MIGRATION m1bnp3d3c3zo7nmvyyy6hyd667hix5derk733uasj6cyrgfwyjcj2a
    ONTO m15iuhqzf2vlclrlov32yi3qiuli4mxyagrzkv34f6sxmtqbaf7wpq
{
  ALTER TYPE default::Place {
      CREATE MULTI PROPERTY foodsAndDrinksServed: std::str;
  };
  ALTER TYPE default::Place {
      CREATE PROPERTY location: std::str;
  };
  ALTER TYPE default::Place {
      CREATE REQUIRED PROPERTY profileImageRoninId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::Place {
      CREATE REQUIRED PROPERTY profileImageUrl: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::Place {
      ALTER PROPERTY profilePhotoUrl {
          RENAME TO googlePlaceId;
      };
  };
  ALTER TYPE default::Place {
      CREATE PROPERTY quiet: std::bool;
      CREATE PROPERTY veganFriendly: std::bool;
  };
};
