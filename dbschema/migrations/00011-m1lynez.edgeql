CREATE MIGRATION m1lynezxl6fdtuxkfjznegjkolzektlm434gt4eoyo45x2oq5oqdoa
    ONTO m1uqvu6aeekorvtsgq3qc3bcsyis3bvorpv77wlhglfqps5gopsrkq
{
  CREATE TYPE default::GlobalState {
      CREATE MULTI PROPERTY popularDishes: std::str;
  };
};
