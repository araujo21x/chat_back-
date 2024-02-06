export default function getEmailBody(
  email: string,
  context: any,
  template: string
) {
  switch (template) {
    case 'forgotPassword':
      return {
        from: process.env.EMAIL_SENDGRID,
        to: `<${email}>`,
        subject: 'E-mail de recuperação de senha',
        template,
        context,
      };

    default:
      return null;
  }
}
