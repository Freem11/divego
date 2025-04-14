examples are from:
https://www.i18next.com/overview/getting-started

## Accessing keys

( resources with 2 keys: )

{
"key": "value of key",
"look": {
"deep": "value of look deep"
}
}

i18next.t('key'); -> "value of key"
i18next.t('look.deep'); -> "value of look deep"
i18next.t('key', 'default value to show'); -> will show the 'default value to show'

---

## Variables:

{
"key": "{{what}} is {{how}}"
}

i18next.t('key', { what: 'i18next', how: 'great' }); -> "i18next is great"

---

## Plurals:

!important!

- Note: The variable name must be count.
- And it must be present: i18next.t('key', {count: 1});
- There will be no fallback to the 'key' value if count is not provided.

{
"key_one": "item",
"key_other": "items",
"keyWithCount_one": "{{count}} item",
"keyWithCount_other": "{{count}} items"
}

i18next.t('key', {count: 0}); -> "items"
i18next.t('key', {count: 1}); -> "item"
i18next.t('key', {count: 5}); -> "items"
i18next.t('key', {count: 100}); -> "items"
i18next.t('keyWithCount', {count: 0}); -> "0 items"
i18next.t('keyWithCount', {count: 1}); -> "1 item"
i18next.t('keyWithCount', {count: 5}); -> "5 items"
i18next.t('keyWithCount', {count: 100}); -> "100 items"


## Namespaces:

two options u can use it:

Option 1:
  const { t: tAuth } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  and then like so:
  tAuth("landing.title")
  tCommon("button.login")

Option 2:
  const { t } = useTranslation();

  and then like so:
  t('auth:login.title')
