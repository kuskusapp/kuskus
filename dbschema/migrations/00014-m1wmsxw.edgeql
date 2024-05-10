CREATE MIGRATION m1wmsxwi2dtuyspn5aeqbunuznhqhyys5soxklzn34wdf3tfgtw2wa
    ONTO m1rnzcotjkkwhwgcvicus7ucsosq2skhs4ae5sfwkn4ytvyolbedgq
{
  ALTER TYPE default::Singleton {
      CREATE DELEGATED CONSTRAINT std::exclusive ON (true);
      DROP TRIGGER prohibit_subsequent_writes;
  };
};
