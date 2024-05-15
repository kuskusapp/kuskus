CREATE MIGRATION m15iuhqzf2vlclrlov32yi3qiuli4mxyagrzkv34f6sxmtqbaf7wpq
    ONTO m1dnrwdknwk54gevpajv3asb7mgvrgc3ipjrym5yfjgfrosb73eehq
{
  ALTER TYPE default::Post {
      ALTER PROPERTY imageHeight {
          SET TYPE std::int16;
      };
      ALTER PROPERTY imageWidth {
          SET TYPE std::int16;
      };
  };
};
