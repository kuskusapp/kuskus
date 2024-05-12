CREATE MIGRATION m1y5jkxx4tgnktjggsbi27ib3uleqgotrvx6krfvcbta4f7hsftqua
    ONTO m1rrtq3hl4kmitoov4f2bumnn4f2w7pfy4qae2ivztpt3d7fh3idqq
{
  CREATE EXTENSION pgvector VERSION '0.5';
  CREATE EXTENSION ai VERSION '1.0';
  ALTER TYPE default::Post {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.aiDescription);
  };
};
