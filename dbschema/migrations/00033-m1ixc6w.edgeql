CREATE MIGRATION m1ixc6wjufvltkrqg7ijkrs66ycynhdfmd75hih4rd45xu5eggzvjq
    ONTO m1axhnbgyihje5avzjmqcpkszjemxhdkjfqwbnjru3ne4uheiaocgq
{
  ALTER TYPE default::User {
      CREATE PROPERTY roninId: std::str;
  };
};
