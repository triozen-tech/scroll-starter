# How to add, change or remove a rule

## What is fixed and what is yours

| File | Whose | Can you edit it? |
|---|---|---|
| `CLAUDE.md` Part A, "Core rules" | Fixed | No. These protect you and other people. |
| `CLAUDE.md` Part B, "Style rules" | Yours | Yes. These are defaults. |
| `MY-RULES.md` | Yours | Yes. Add, change or remove anything. |

Part C of `CLAUDE.md` pulls `MY-RULES.md` in with the line `@MY-RULES.md`. Leave that line where it is.

## Add a rule

1. Open `MY-RULES.md` (for your own taste) or Part B of `CLAUDE.md` (to change a default).
2. Write one line. Plain words. Say what to do or not to do, for example: `Headings are always lowercase.`
3. Say what it affects if it is not obvious: `Applies to every section headline.`
4. Test it on a small change (see below).

## Change a rule

Edit the line. Keep it to one line. If two rules disagree, delete the older one. Claude Code should never have to guess.

## Remove a rule

Delete the line. Rules in Part B can be deleted too, and then the default no longer applies.

## Test a rule

1. Ask Claude Code for one small change the rule should affect, for example: "Add a one-line tagline under the hero headline."
2. Look at the result. Did it follow the rule?
3. If not, make the rule clearer (a number, an example) and try again.

## Good rules and weak rules

- Good: `Section headlines are at most four words.`
- Weak: `Make the headlines nicer.`
- Good: `Use the accent colour only on buttons and links.`
- Weak: `Don't use too much colour.`
