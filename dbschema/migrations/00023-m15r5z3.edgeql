CREATE MIGRATION m15r5z3ro76levn3buqewf5pzjbrqoken5a26lqkfbqtzimppytpzq
    ONTO m1i5ze3zet6goetnhlytbpia3votcjf2uos3zs6h75f7zn3hhg5gva
{
  ALTER TYPE default::Post {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.aiDescription);
  };
};
