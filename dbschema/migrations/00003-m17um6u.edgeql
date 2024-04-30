CREATE MIGRATION m17um6ub374m7xymhni3eqme3vh4y6xu4dekh7qepycipzhweaqocq
    ONTO m1x45xkh6f6etaul2exzk5hvgfwmnp5ekzcxs5hlgyoreau4npp4wa
{
  CREATE TYPE default::Place {
      CREATE PROPERTY bio: std::str;
      CREATE PROPERTY category: std::str;
      CREATE PROPERTY displayName: std::str;
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY profilePhoto: std::str;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK followingPlaces: default::Place;
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY bio: std::str;
      CREATE PROPERTY displayName: std::str;
      CREATE PROPERTY profilePhoto: std::str;
  };
  CREATE TYPE default::Post {
      CREATE REQUIRED LINK created_by: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY photoUrl: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
