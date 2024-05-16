CREATE MIGRATION m1ggq4lw35cb7xy7sutkjr325n3rnsitrovtnqd4szwfb55m3ja72q
    ONTO m1bnp3d3c3zo7nmvyyy6hyd667hix5derk733uasj6cyrgfwyjcj2a
{
  ALTER TYPE default::Place {
      ALTER PROPERTY displayName {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY location {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
