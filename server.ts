import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const hasMailConfig = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);

function buildLeadMarkup(payload: Required<LeadPayload>) {
  const fields = [
    ['Nome', payload.name],
    ['Empresa', payload.company],
    ['E-mail', payload.email],
    ['Telefone', payload.phone],
    ['Serviço de interesse', payload.service],
  ];

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;color:#607086;font-weight:700;">${label}</td><td style="padding:10px 0;color:#0b1522;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px;background:#f4f7fb;border:1px solid #d6dee8;border-radius:18px;color:#0b1522;">
      <p style="margin:0 0 10px;color:#15a19a;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Novo lead via site</p>
      <h2 style="margin:0 0 18px;font-size:28px;line-height:1.2;">Solicitação comercial recebida</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">${rows}</table>
      <div style="padding:18px;background:#ffffff;border-radius:14px;border:1px solid #d6dee8;">
        <p style="margin:0 0 8px;color:#607086;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Escopo inicial</p>
        <p style="margin:0;line-height:1.7;">${escapeHtml(payload.message)}</p>
      </div>
    </div>
  `;
}

function buildClientConfirmation(payload: Required<LeadPayload>) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px;background:#f4f7fb;border:1px solid #d6dee8;border-radius:18px;color:#0b1522;">
      <p style="margin:0 0 10px;color:#15a19a;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">S2F Engenharia</p>
      <h2 style="margin:0 0 18px;font-size:28px;line-height:1.2;">Recebemos sua solicitação</h2>
      <p style="margin:0 0 14px;line-height:1.7;">Olá, <strong>${escapeHtml(
        payload.name,
      )}</strong>. Obrigado por entrar em contato com a S2F Engenharia.</p>
      <p style="margin:0 0 14px;line-height:1.7;">Nossa equipe comercial e técnica vai analisar o contexto de <strong>${escapeHtml(
        payload.company,
      )}</strong> e retornar com os próximos passos pelo e-mail <strong>${escapeHtml(
        payload.email,
      )}</strong> ou pelo telefone <strong>${escapeHtml(payload.phone)}</strong>.</p>
      <div style="padding:18px;background:#ffffff;border-radius:14px;border:1px solid #d6dee8;">
        <p style="margin:0 0 8px;color:#607086;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Demanda informada</p>
        <p style="margin:0 0 6px;line-height:1.7;"><strong>Serviço:</strong> ${escapeHtml(payload.service)}</p>
        <p style="margin:0;line-height:1.7;">${escapeHtml(payload.message)}</p>
      </div>
      <p style="margin:18px 0 0;line-height:1.7;">Se a demanda for urgente, você também pode falar pelo WhatsApp comercial.</p>
    </div>
  `;
}

function validateLead(body: LeadPayload) {
  const errors: string[] = [];
  const email = body.email?.trim() ?? '';
  const requiredFields: Array<[keyof LeadPayload, string]> = [
    ['name', 'nome'],
    ['company', 'empresa'],
    ['email', 'e-mail'],
    ['phone', 'telefone'],
    ['service', 'serviço'],
    ['message', 'mensagem'],
  ];

  requiredFields.forEach(([field, label]) => {
    if (!body[field]?.trim()) {
      errors.push(`O campo ${label} é obrigatório.`);
    }
  });

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Informe um e-mail válido.');
  }

  return errors;
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(cors());
  app.use(express.json());

  app.post('/submit-quote', async (req, res) => {
    const payload = req.body as LeadPayload;
    const errors = validateLead(payload);

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: errors[0],
      });
    }

    const normalizedPayload: Required<LeadPayload> = {
      name: payload.name!.trim(),
      company: payload.company!.trim(),
      email: payload.email!.trim(),
      phone: payload.phone!.trim(),
      service: payload.service!.trim(),
      message: payload.message!.trim(),
    };

    if (!hasMailConfig()) {
      console.warn('SMTP não configurado. Lead registrado apenas no servidor local.', normalizedPayload);
      return res.status(202).json({
        status: 'queued',
        message:
          'Solicitação registrada com sucesso. O envio por e-mail ainda não está configurado neste ambiente, mas os dados foram recebidos para validação local.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const commercialEmail = process.env.COMMERCIAL_EMAIL ?? process.env.SMTP_USER!;
    const fromAddress = process.env.SMTP_FROM ?? process.env.SMTP_USER!;

    try {
      await transporter.sendMail({
        from: `"S2F Engenharia" <${fromAddress}>`,
        to: commercialEmail,
        subject: `Novo lead | ${normalizedPayload.company} | ${normalizedPayload.service}`,
        html: buildLeadMarkup(normalizedPayload),
      });

      await transporter.sendMail({
        from: `"S2F Engenharia" <${fromAddress}>`,
        to: normalizedPayload.email,
        subject: 'Recebemos sua solicitação | S2F Engenharia',
        html: buildClientConfirmation(normalizedPayload),
      });

      return res.status(200).json({
        status: 'success',
        message: 'Solicitação enviada com sucesso. Nossa equipe vai retornar em breve.',
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail do lead:', error);
      return res.status(500).json({
        status: 'error',
        message:
          'Não foi possível concluir o envio agora. Tente novamente em instantes ou use o WhatsApp comercial.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: __dirname,
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor da S2F rodando em http://localhost:${port}`);
  });
}

startServer();
