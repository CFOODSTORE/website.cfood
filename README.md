# Challenge Food — multilingual website

Static site prepared for Cloudflare Pages.

## Languages
English, French, Turkish, Russian, Chinese and Arabic (RTL).

## Contact forms
- Commercial order / quotation form -> `commercial.export@cfood.store`
- General information form -> `info@cfood.store`

The production forms use FormSubmit (`formsubmit.co`) so the static Cloudflare Pages site can relay a submitted form to an email address without storing mail credentials in browser code.

### Important before publication
1. Create and test the alias `info@cfood.store` in Zoho Mail.
2. Make sure `commercial.export@cfood.store` receives mail.
3. After deployment, submit each form once. FormSubmit may send a one-time activation email to the destination address; confirm it.
4. Submit each form again and verify delivery.
5. If you prefer not to use a third-party relay, replace FormSubmit later with a Cloudflare Pages Function connected to a transactional email provider.

## Cloudflare Pages
Upload this folder or connect its GitHub repository. No build command is required; the site is plain HTML/CSS/JavaScript.

Recommended production domain: `cfood.store` and `www.cfood.store`.

Do not remove the existing Zoho Mail MX, SPF, DKIM or DMARC records when connecting the domain to Cloudflare Pages.

## Certification wording
Special requests (Organic/NOP, Fairtrade, extract/essence, oleoresin/concentrates) are presented as **on request**. The site does not claim that a processed product is certified simply because certified vanilla beans are used; finished-product certification is confirmed in the quotation and supporting documents.
