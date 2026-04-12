import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/submit-quote', async (req, res) => {
    const { name, company, email, phone, message } = req.body;

    console.log('Received quote request:', { name, company, email });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'rsantoss0012@gmail.com',
        pass: 'ktqd bgtf mifl kxoi',
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #0A3D73; border-bottom: 2px solid #0A3D73; padding-bottom: 10px;">Nova Solicitação de Orçamento - S2F</h2>
        <div style="margin-top: 20px;">
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
        </div>
        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong>Descrição do Projeto:</strong></p>
          <p>${message}</p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
          Este e-mail foi enviado automaticamente pelo sistema de leads da S2F Engenharia.
        </div>
      </div>
    `;

    const clientHtmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #0A3D73; border-bottom: 2px solid #0A3D73; padding-bottom: 10px;">Confirmação de Solicitação - S2F Engenharia</h2>
        <p>Olá <strong>${name}</strong>,</p>
        <p>Recebemos sua solicitação de orçamento para a empresa <strong>${company}</strong>.</p>
        <p>Nossa equipe técnica já foi notificada e entrará em contato com você em breve através do e-mail <strong>${email}</strong> ou telefone <strong>${phone}</strong>.</p>
        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p><strong>Resumo da sua mensagem:</strong></p>
          <p>${message}</p>
        </div>
        <p>Atenciosamente,<br>Equipe S2F Engenharia & Serviços</p>
        <div style="margin-top: 20px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
          Este é um e-mail automático, por favor não responda.
        </div>
      </div>
    `;

    try {
      // Send notification to S2F Team
      await transporter.sendMail({
        from: '"S2F Website" <rsantoss0012@gmail.com>',
        to: 'mickey_gimli@hotmail.com',
        subject: `NOVO LEAD: ${company} - ${name}`,
        html: htmlContent,
      });

      // Send confirmation to Client
      await transporter.sendMail({
        from: '"S2F Engenharia" <rsantoss0012@gmail.com>',
        to: email,
        subject: `Recebemos sua solicitação - S2F Engenharia`,
        html: clientHtmlContent,
      });

      console.log('Emails sent successfully');
      res.status(200).json({ status: 'success', message: 'Emails dispatched' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 'error', message: 'Failed to dispatch email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
