import {
  pgTable,
  uniqueIndex,
  foreignKey,
  pgEnum,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
  doublePrecision,
  integer,
  text,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const user_status = pgEnum("user_status", [
  "inactive",
  "blocked",
  "active",
]);
export const organization_system_type = pgEnum("organization_system_type", [
  "jowi",
  "r_keeper",
  "iiko",
]);
export const work_schedule_entry_status = pgEnum("work_schedule_entry_status", [
  "closed",
  "open",
]);
export const organization_payment_types = pgEnum("organization_payment_types", [
  "client",
  "card",
  "cash",
]);
export const manufacturers_properties_types = pgEnum(
  "manufacturers_properties_types",
  ["list", "date", "boolean", "number", "string"]
);

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
      UQ_648e3f5447f725579d7d4ffdfb7: uniqueIndex(
        "UQ_648e3f5447f725579d7d4ffdfb7"
      ).on(table.name),
      UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0: uniqueIndex(
        "UQ_0e2c0e1b4b0b0b0b0b0b0b0b0b0"
      ).on(table.code),
    };
  }
);

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
    tg_id: varchar("tg_id"),
    tg_username: varchar("tg_username"),
    photo_url: varchar("photo_url"),
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
      UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0: uniqueIndex(
        "UQ_0e2c0e1b3b0b0b0b0b0b0b0b0b0"
      ).on(table.login),
      fki_users_login: index("fki_users_login").on(table.login),
    };
  }
);

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
      code_key: uniqueIndex("langs_code_key").on(table.code),
    };
  }
);

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
      code_key: uniqueIndex("categories_code_key").on(table.code),
    };
  }
);

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
      code_key: uniqueIndex("image_sizes_code_key").on(table.code),
    };
  }
);

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

export const manufacturers_properties_categories = pgTable(
  "manufacturers_properties_categories",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    i18n_name: jsonb("i18n_name"),
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
      ).on(table.slug),
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
      PK_0cd11f0b35c4d348c6ebb9b36b7: primaryKey(
        table.role_id,
        table.permission_id
      ),
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
      PK_7f3736984cd8546a1e418005561: primaryKey(
        table.user_id,
        table.permission_id
      ),
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
      PK_c525e9373d63035b9919e578a9c: primaryKey(table.user_id, table.role_id),
    };
  }
);

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
  after_value: text("after_value").notNull(),
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
});

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  form_json: jsonb("form_json").notNull(),
  form_recipients: jsonb("form_recipients").notNull(),
  status: text("status").notNull(),
  schedule_type: text("schedule_type").notNull(),
  schedule_time: timestamp("schedule_time", {
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

export const manufacturers_users = pgTable("manufacturers_users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  manufacturer_id: uuid("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id, { onUpdate: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onUpdate: "cascade" }),
  post: text("post"),
  is_admin: boolean("is_admin").default(false).notNull(),
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

export const forms_sent_items = pgTable("forms_sent_items", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  form_id: uuid("form_id").notNull(),
  model: text("model").notNull(),
  model_id: text("model_id").notNull(),
  status: text("status").notNull(),
  opened_at: timestamp("opened_at", {
    precision: 5,
    withTimezone: true,
    mode: "string",
  }),
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

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  is_group: boolean("is_group").default(false).notNull(),
  manufacturer_id: uuid("manufacturer_id"),
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
      PK_3a1f1f251e5d6d2b9c1a7c5c9d1: primaryKey({
        columns: [table.id, table.sent_at],
      }),
    };
  }
);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  manufacturer_id: uuid("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id, { onUpdate: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").default(true).notNull(),
  price: integer("price"),
  stock_quantity: integer("stock_quantity"),
  properties: jsonb("properties").$type<Record<string, any>>(),
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

export const products_categories = pgTable("products_categories", {
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
});

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  property_type: text("property_type").notNull(),
  code: text("code"),
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

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  user_id: uuid("user_id").notNull(),
  field_name: text("field_name").notNull(),
  field_value: text("field_value").notNull(),
  reference_id: uuid("references_id"),
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
  name: text("name"),
  short_name: text("short_name"),
  description: text("description"),
  active: boolean("active").default(false).notNull(),
  rating: doublePrecision("rating"),
  country: text("country"),
  type: text("type").notNull(), // manufacturer, customer, etc.
  org_type: text("org_type"), // company, foundation, etc.
  city: text("city"),
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
