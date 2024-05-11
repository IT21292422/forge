import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class NotificationsService {
  getHello(): string {
    return 'Hello Notifications!';
  }

  onModuleInit() {
    console.log(`Notifications service has been started on port 3004`);
  }

  async handleUserCreatedEvent(email: string) {
    console.log('email is here', email);
    // const resend = new Resend(process.env.EMAIL_API_KEY);
    // const { data, error } = await resend.emails.send({
    //   from: 'Forge <onboarding@resend.dev>',
    //   to: email,
    //   subject: 'Welcome to Forge',
    //   html: `<p>We're absolutely delighted to welcome you to the Forge family</p>
    //   <p>Your journey with us is about to begin, and we're here to make every step memorable and enjoyable. Whether you're here to learn or teach, we've got you covered!
    //   Feel free to dive right in and explore all the amazing features waiting for you. And remember, if you ever have any questions or need a helping hand, we're just a click away.</p>
    //   <p>Happy learning, teaching, and growing!</p>
    //   <p>Forge Team</p>
    //   <p></p>
    //   <p>If you have any questions, feel free to reach out to us at https://localhost:3000</p>
    //   `,
    // });
    // if (error) {
    //   console.log('email sent error is here', error);
    //   return { id: null, status: 'error' };
    // }
    // console.log('email sent successfully, data is here', { data });
    // return { id: data.id, status: 'success' };
  }

  getHealth(data: { testData: string }) {
    return {
      status: 'OK',
      service: 'notifications',
      timestamp: Date.now(),
      test: data.testData,
    };
  }
}
