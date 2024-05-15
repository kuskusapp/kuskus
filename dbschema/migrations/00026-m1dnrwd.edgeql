CREATE MIGRATION m1dnrwdknwk54gevpajv3asb7mgvrgc3ipjrym5yfjgfrosb73eehq
    ONTO m1e7ld67bx2xtiwocoioegdvh6lmx66zp7ixfms5gyjov2ikfwjpaq
{
  ALTER TYPE default::Post {
      ALTER PROPERTY imageHeight {
          SET TYPE std::int64 USING (<std::int64>.imageHeight);
      };
      ALTER PROPERTY imageWidth {
          SET TYPE std::int64 USING (<std::int64>.imageWidth);
      };
  };
};
