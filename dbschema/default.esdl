using extension auth;

module default {
  scalar type Role extending enum<admin, user>;
  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );
  type User {
    required identity: ext::auth::Identity;
    email: str {
      constraint exclusive;
    };
    # kuskus.app/{name}
    name: str {
      constraint exclusive;
    };
    # pretty name of user (same as X username/name split)
    displayName: str;
    bio: str;
    # cloudflare r2 url with image
    profilePhotoUrl: str;
    # city or country
    place: str;

    # -- links
    createdPosts := .<created_by[is Post];

    # TODO: how roles work, add admin role
    # admin can manage/edit places, they admin over [place-ids]
    userRole: Role {
      default := "user";
    };
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }
  type Place {
    # i.e. kuskus.app/places/{name}
    required name: str {
      constraint exclusive;
    };
    # pretty name of place
    displayName: str;
    bio: str;
    # TODO: should be geo location (coordinates)
    # location: str;
    # coffee shop, bar, restaurant, etc.
    category: str;
    # cloudflare r2 url with image
    profilePhotoUrl: str;
  }
  # kuskus.app/posts/{edgedb-post-uuid}
  type Post {
    # cloudflare r2 url with image
    required photoUrl: str;
    # TODO: allow multiple photos?

    description: str;
    # TODO: add date created etc.
    required created_by: User {
      default := global current_user;
    }
    # TODO: add place
    # place: str;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }
  # global state for app (not tied to anything)
  type GlobalState {
    # used in / route | TODO: can be computed later on demand
    multi popularDishes: str;
    trigger prohibit_subsequent_writes after insert for each do (
      select assert(
        (select count(GlobalState)) = 1,
        message := "Cannot add another GlobalState object. Do an update instead."
      )
    );
  }
}
