import {
  pgTable,
  foreignKey,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  uniqueIndex,
  index,
  boolean,
  jsonb,
  doublePrecision,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const manufacturers_properties_types = pgEnum(
  "manufacturers_properties_types",
  ["string", "number", "boolean", "date", "list"]
);
export const user_status = pgEnum("user_status", [
  "active",
  "blocked",
  "inactive",
]);

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  path: text("path"),
  size: integer("size").notNull(),
  mime_type: text("mime_type").notNull(),
  parent_id: uuid("parent_id"),
  resize_code: text("resize_code"),
  model: text("model"),
  model_id: text("model_id"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  created_by: uuid("created_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  updated_by: uuid("updated_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  code: text("code"),
});

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    active: boolean("active").default(true).notNull(),
    name: text("name").notNull(),
    description: text("description"),
    code: text("code").notNull(),
    parent_id: uuid("parent_id"),
    i18n_name: jsonb("i18n_name").notNull(),
    i18n_description: jsonb("i18n_description"),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      code_key: uniqueIndex("categories_code_key").using("btree", table.code),
      idx_categories_parent_id: index("idx_categories_parent_id").using(
        "btree",
        table.parent_id
      ),
    };
  }
);

export const api_tokens = pgTable("api_tokens", {
  id: uuid("id"),
  active: boolean("active"),
  token: text("token"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  created_by: uuid("created_by"),
  updated_by: uuid("updated_by"),
});

export const cities = pgTable("cities", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  is_group: boolean("is_group").default(false).notNull(),
  created_by: uuid("created_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  updated_by: uuid("updated_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  manufacturer_id: uuid("manufacturer_id"),
});

export const form_filled_values = pgTable("form_filled_values", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  form_id: uuid("form_id").notNull(),
  form_sent_item_id: uuid("form_sent_item_id").notNull(),
  field_id: text("field_id").notNull(),
  field_label: text("field_label").notNull(),
  value: text("value").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  form_json: jsonb("form_json").notNull(),
  form_recipients: jsonb("form_recipients").notNull(),
  status: text("status").notNull(),
  schedule_type: text("schedule_type").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  created_by: uuid("created_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  updated_by: uuid("updated_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  schedule_time: timestamp("schedule_time", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const forms_sent_items = pgTable("forms_sent_items", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  form_id: uuid("form_id").notNull(),
  model: text("model").notNull(),
  model_id: text("model_id").notNull(),
  status: text("status").notNull(),
  opened_by: uuid("opened_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  applied_by: uuid("applied_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  opened_at: timestamp("opened_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const image_sizes = pgTable(
  "image_sizes",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    code: text("code").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
  },
  (table) => {
    return {
      code_key: uniqueIndex("image_sizes_code_key").using("btree", table.code),
    };
  }
);

export const langs = pgTable(
  "langs",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    code: text("code").notNull(),
    name: text("name").notNull(),
    is_default: boolean("is_default").default(false).notNull(),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      code_key: uniqueIndex("langs_code_key").using("btree", table.code),
    };
  }
);

export const manufacturers = pgTable("manufacturers", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  short_name: text("short_name").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").default(true).notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  city_id: uuid("city_id").references(() => cities.id, { onUpdate: "cascade" }),
  rating: doublePrecision("rating").notNull(),
});

export const manufacturers_categories = pgTable("manufacturers_categories", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  manufacturer_id: uuid("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id, { onUpdate: "cascade" }),
  category_id: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onUpdate: "cascade" }),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const manufacturers_properties_categories = pgTable(
  "manufacturers_properties_categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    i18n_name: jsonb("i18n_name"),
  }
);

export const manufacturers_properties_values = pgTable(
  "manufacturers_properties_values",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    property_id: uuid("property_id")
      .notNull()
      .references(() => manufacturers_properties.id, { onUpdate: "cascade" }),
    manufacturer_id: uuid("manufacturer_id")
      .notNull()
      .references(() => manufacturers.id, { onUpdate: "cascade" }),
    value: text("value").notNull(),
  }
);

export const manufacturers_reviews = pgTable("manufacturers_reviews", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  manufacturer_id: uuid("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id, { onUpdate: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  rating: doublePrecision("rating"),
  comment: text("comment"),
  active: boolean("active").default(false).notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const manufacturers_users = pgTable("manufacturers_users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  manufacturer_id: uuid("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id, { onUpdate: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  post: text("post"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  is_admin: boolean("is_admin").default(false).notNull(),
});

export const participants = pgTable("participants", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  conversation_id: uuid("conversation_id").notNull(),
  user_id: uuid("user_id").notNull(),
  is_admin: boolean("is_admin").default(false).notNull(),
  is_deleted: boolean("is_deleted").default(false).notNull(),
  joined_at: timestamp("joined_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  left_at: timestamp("left_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const permissions = pgTable(
  "permissions",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    description: varchar("description", { length: 60 }).notNull(),
    active: boolean("active").default(true).notNull(),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    created_by: uuid("created_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
    updated_by: uuid("updated_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      UQ_d090ad82a0e97ce764c06c7b312: uniqueIndex(
        "UQ_d090ad82a0e97ce764c06c7b312"
      ).using("btree", table.slug),
    };
  }
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    manufacturer_id: uuid("manufacturer_id")
      .notNull()
      .references(() => manufacturers.id, { onUpdate: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    active: boolean("active").default(true).notNull(),
    price: integer("price"),
    stock_quantity: integer("stock_quantity"),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    properties: jsonb("properties"),
  },
  (table) => {
    return {
      idx_products_active: index("idx_products_active").using(
        "btree",
        table.active
      ),
    };
  }
);

export const products_categories = pgTable(
  "products_categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    product_id: uuid("product_id")
      .notNull()
      .references(() => products.id, { onUpdate: "cascade" }),
    category_id: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onUpdate: "cascade" }),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      idx_products_categories_category_id: index(
        "idx_products_categories_category_id"
      ).using("btree", table.category_id),
    };
  }
);

export const products_properties = pgTable("products_properties", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id, { onUpdate: "cascade" }),
  property_id: uuid("property_id")
    .notNull()
    .references(() => properties.id, { onUpdate: "cascade" }),
  value: text("value").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  property_type: text("property_type").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  code: text("code"),
});

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    code: varchar("code", { length: 50 }),
    active: boolean("active").default(true).notNull(),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    created_by: uuid("created_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
    updated_by: uuid("updated_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0: uniqueIndex(
        "UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0"
      ).using("btree", table.code),
      UQ_648e3f5447f725579d7d4ffdfb7: uniqueIndex(
        "UQ_648e3f5447f725579d7d4ffdfb7"
      ).using("btree", table.name),
    };
  }
);

export const scheduled_reports = pgTable("scheduled_reports", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  cron: text("cron").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const seo_links = pgTable("seo_links", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  description: text("description"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict", onUpdate: "cascade" }),
  user_agent: text("user_agent").notNull(),
  device_name: text("device_name").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const sp_ticket_categories = pgTable("sp_ticket_categories", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  sort: integer("sort").notNull(),
});

export const sp_ticket_statuses = pgTable("sp_ticket_statuses", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  code: text("code"),
  color: text("color"),
  sort: integer("sort").notNull(),
});

export const sp_tickets = pgTable("sp_tickets", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category_id: uuid("category_id").notNull(),
  status_id: uuid("status_id").notNull(),
  created_by: uuid("created_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  updated_by: uuid("updated_by").references(() => users.id, {
    onUpdate: "cascade",
  }),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const sp_tickets_categories_responses = pgTable(
  "sp_tickets_categories_responses",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    user_id: uuid("user_id").notNull(),
    response_type: text("response_type").notNull(),
    category_id: uuid("category_id").notNull(),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    }),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    }),
  }
);

export const sp_tickets_comments = pgTable("sp_tickets_comments", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  ticket_id: uuid("ticket_id").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  comment: text("comment").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const sp_tickets_responses = pgTable("sp_tickets_responses", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  user_id: uuid("user_id").notNull(),
  response_type: text("response_type").notNull(),
  ticket_id: uuid("ticket_id").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
});

export const sp_tickets_timeline = pgTable("sp_tickets_timeline", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  ticket_id: uuid("ticket_id").notNull(),
  user_id: uuid("user_id").notNull(),
  before_value: text("before_value").notNull(),
  timeline_type: text("timeline_type").notNull(),
  comment: text("comment").notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
  after_value: text("after_value").notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    login: varchar("login", { length: 100 }).notNull(),
    first_name: varchar("first_name", { length: 100 }),
    last_name: varchar("last_name", { length: 100 }),
    password: varchar("password").notNull(),
    salt: varchar("salt"),
    status: user_status("status").notNull(),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    tg_id: varchar("tg_id"),
    tg_username: varchar("tg_username"),
    photo_url: varchar("photo_url"),
  },
  (table) => {
    return {
      UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0: uniqueIndex(
        "UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0"
      ).using("btree", table.login),
      fki_users_login: index("fki_users_login").using("btree", table.login),
    };
  }
);

export const manufacturers_properties = pgTable("manufacturers_properties", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  i18n_name: jsonb("i18n_name"),
  category_id: uuid("category_id")
    .notNull()
    .references(() => manufacturers_properties_categories.id, {
      onUpdate: "cascade",
    }),
  type: manufacturers_properties_types("type").notNull(),
  additional_data: jsonb("additional_data"),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  show_in_filter: boolean("show_in_filter").default(false).notNull(),
  show_in_list: boolean("show_in_list").default(false).notNull(),
});

export const scheduled_reports_subscription = pgTable(
  "scheduled_reports_subscription",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    report_id: uuid("report_id")
      .notNull()
      .references(() => scheduled_reports.id, { onUpdate: "cascade" }),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onUpdate: "cascade" }),
    created_at: timestamp("created_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  }
);

export const roles_permissions = pgTable(
  "roles_permissions",
  {
    role_id: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onUpdate: "cascade" }),
    permission_id: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onUpdate: "cascade" }),
    created_by: uuid("created_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
    updated_by: uuid("updated_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      roles_permissions_role_id_permission_id_pk: primaryKey({
        columns: [table.role_id, table.permission_id],
        name: "roles_permissions_role_id_permission_id_pk",
      }),
    };
  }
);

export const users_permissions = pgTable(
  "users_permissions",
  {
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onUpdate: "cascade" }),
    permission_id: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onUpdate: "cascade" }),
    created_by: uuid("created_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
    updated_by: uuid("updated_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      users_permissions_user_id_permission_id_pk: primaryKey({
        columns: [table.user_id, table.permission_id],
        name: "users_permissions_user_id_permission_id_pk",
      }),
    };
  }
);

export const users_roles = pgTable(
  "users_roles",
  {
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onUpdate: "cascade" }),
    role_id: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onUpdate: "cascade" }),
    created_by: uuid("created_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
    updated_by: uuid("updated_by").references(() => users.id, {
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      users_roles_user_id_role_id_pk: primaryKey({
        columns: [table.user_id, table.role_id],
        name: "users_roles_user_id_role_id_pk",
      }),
    };
  }
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().notNull(),
    conversation_id: uuid("conversation_id").notNull(),
    sender_id: uuid("sender_id").notNull(),
    message: text("message").notNull(),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    sent_at: timestamp("sent_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    edited_at: timestamp("edited_at", {
      precision: 5,
      withTimezone: true,
      mode: "string",
    }),
  },
  (table) => {
    return {
      sent_at_idx: index("messages_sent_at_idx").using("btree", table.sent_at),
      messages_id_sent_at_pk: primaryKey({
        columns: [table.id, table.sent_at],
        name: "messages_id_sent_at_pk",
      }),
    };
  }
);

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onUpdate: "cascade",
    }),
  field_name: text("field_name").notNull(),
  field_value: text("field_value").notNull(),
  reference_id: uuid("references_id")
    .notNull()
    .references(() => memberships.id, {
      onUpdate: "cascade",
    }),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").unique(),
  short_name: text("short_name").unique(),
  description: text("description"),
  active: boolean("active").default(false).notNull(),
  rating: doublePrecision("rating"),
  country: text("country"),
  type: text("type").notNull(), // manufacturer, customer, etc.
  org_type: text("org_type"), // company, foundation, etc.
  city: text("city"),
  ein: integer("ein"),
  address: text("address"),
  fact_address: text("fact_address"),
  email: text("email"),
  web_site: text("web_site"),
  vat: boolean("vat").default(false).notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const membership_users = pgTable("membership_users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  membership_id: uuid("membership_id")
    .notNull()
    .references(() => memberships.id, { onUpdate: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  job_title: text("post"),
  is_admin: boolean("is_admin").default(false).notNull(),
  created_at: timestamp("created_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const productRequests = pgTable(
  "product_requests",
  {
    id: uuid("id").defaultRandom().notNull(),
    userId: uuid("user_id"),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 255 }),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      product_requests_id_created_at_pk: primaryKey({
        columns: [table.id, table.created_at],
        name: "product_requests_id_created_at_pk",
      }),
    };
  }
);

export const productRequestItems = pgTable(
  "product_request_items",
  {
    id: uuid("id").defaultRandom().notNull(),
    requestId: uuid("request_id").notNull(),
    productId: uuid("product_id"),
    quantity: integer("quantity").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      product_requests_items_id_created_at_pk: primaryKey({
        columns: [table.id, table.created_at],
        name: "product_requests_items_id_created_at_pk",
      }),
    };
  }
);

export const locations = pgTable(
  "locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("location_types", { length: 255 }).notNull(), // 'country', 'state', or 'city'
    country_id: uuid("country_id"),
    state_id: uuid("state_id"),
    code: varchar("code", { length: 50 }),
  },
  (table) => ({
    country_id_idx: index("country_id_idx").on(table.country_id),
    state_id_idx: index("state_id_idx").on(table.state_id),
    type_idx: index("type_idx").on(table.type),
  })
);
