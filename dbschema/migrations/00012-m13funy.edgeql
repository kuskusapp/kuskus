CREATE MIGRATION m13funyex6tu4lk6elwnpxcwkleij6sh3plmre5m73qv4tqfywt54q
    ONTO m1lynezxl6fdtuxkfjznegjkolzektlm434gt4eoyo45x2oq5oqdoa
{
  ALTER TYPE default::GlobalState {
      CREATE TRIGGER prohibit_subsequent_writes
          AFTER INSERT 
          FOR EACH DO (SELECT
              std::assert(((SELECT
                  std::count(default::GlobalState)
              ) = 1), message := 'Cannot add another GlobalState object. Do an update instead.')
          );
  };
};
