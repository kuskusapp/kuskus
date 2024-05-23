CREATE MIGRATION m1axhnbgyihje5avzjmqcpkszjemxhdkjfqwbnjru3ne4uheiaocgq
    ONTO m1undprjrqbb6shl5zbnt6e2di7khx36lsfrct5lvvbmzcj3nqglpa
{
  ALTER TYPE default::Place {
      CREATE PROPERTY googleMapsUrl: std::str;
  };
};
