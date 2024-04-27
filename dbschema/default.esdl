using extension auth;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User { id, name, email, userRole }
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    required identity: ext::auth::Identity;
    required name: str;
    email: str;
  
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

  type Item {
    required name: str;
    required created_by: User {
      default := global current_user;
    }

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy creator_has_full_access
      allow all
      using (.created_by ?= global current_user);
    access policy others_read_only
      allow select, insert;
  }
}