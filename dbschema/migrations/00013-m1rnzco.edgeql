CREATE MIGRATION m1rnzcotjkkwhwgcvicus7ucsosq2skhs4ae5sfwkn4ytvyolbedgq
    ONTO m13funyex6tu4lk6elwnpxcwkleij6sh3plmre5m73qv4tqfywt54q
{
  ALTER TYPE default::GlobalState {
      DROP TRIGGER prohibit_subsequent_writes;
  };
  CREATE ABSTRACT TYPE default::Singleton {
      CREATE TRIGGER prohibit_subsequent_writes
          AFTER INSERT 
          FOR EACH DO (SELECT
              std::assert(((SELECT
                  std::count(__new__.__type__)
              ) = 1), message := (('Cannot add another ' ++ __new__.__type__.name) ++ ' object. Do an update instead.'))
          );
  };
  ALTER TYPE default::GlobalState EXTENDING default::Singleton LAST;
};
