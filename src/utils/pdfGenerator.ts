import { jsPDF } from 'jspdf';
import { 
  PERSONAL_INFO, 
  RESUME_SKILLS_SECTIONS, 
  PROJECTS, 
  INTERNSHIP_EXPERIENCE, 
  RESUME_CERTIFICATES, 
  EDUCATION_LIST 
} from '../data/portfolioData';

/**
 * Generates and downloads an ATS-compliant, pixel-precise single-page PDF Resume
 * matching Aditya Prakash's exact official resume template.
 */
export function generateResumePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36; // 0.5 inch margins
  const contentWidth = pageWidth - margin * 2;

  let y = 34;

  // Colors
  const black = [20, 20, 20];
  const navyBlue = [0, 51, 102];
  const linkBlue = [27, 85, 185];
  const gray = [90, 90, 90];

  // 1. Header: Name & Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.text(PERSONAL_INFO.name, margin, y);
  y += 14;

  doc.setFontSize(8.2);

  // Row 1: LinkedIn (left) & Email (right)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('LinkedIn: ', margin, y);
  const linkedinLabelW = doc.getTextWidth('LinkedIn: ');

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
  const linkedinUrl = PERSONAL_INFO.linkedin;
  doc.textWithLink(linkedinUrl, margin + linkedinLabelW, y, { url: linkedinUrl });

  // Email on right
  const emailText = PERSONAL_INFO.email;
  const emailFull = `Email: ${emailText}`;
  const emailFullW = doc.getTextWidth(emailFull);
  const emailX = pageWidth - margin - emailFullW;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Email: ', emailX, y);
  const emailLabelW = doc.getTextWidth('Email: ');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
  doc.textWithLink(emailText, emailX + emailLabelW, y, { url: `mailto:${emailText}` });
  y += 11;

  // Row 2: Github (left) & Mobile (right)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Github: ', margin, y);
  const githubLabelW = doc.getTextWidth('Github: ');

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
  const githubUrl = PERSONAL_INFO.github;
  doc.textWithLink(githubUrl, margin + githubLabelW, y, { url: githubUrl });

  // Mobile on right
  const mobileText = `Mobile: ${PERSONAL_INFO.phone}`;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Mobile: ', pageWidth - margin - doc.getTextWidth(mobileText), y);
  doc.setFont('helvetica', 'normal');
  doc.text(PERSONAL_INFO.phone, pageWidth - margin - doc.getTextWidth(PERSONAL_INFO.phone), y);
  y += 11;

  // Section Header helper
  function addSectionHeader(title: string) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.65);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8.5;
  }

  // --- 1. SKILLS ---
  addSectionHeader('Skills');

  RESUME_SKILLS_SECTIONS.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
    const label = `${sk.category}:`;
    doc.text(label, margin, y);

    // Fixed indent for alignment across all rows
    const valX = margin + 105;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(black[0], black[1], black[2]);
    const split = doc.splitTextToSize(sk.skills, contentWidth - 105);
    doc.text(split, valX, y);
    y += split.length * 8.8 + 1.2;
  });
  y += 2;

  // --- 2. PROJECTS ---
  addSectionHeader('Projects');

  PROJECTS.forEach((proj) => {
    // Title Line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(proj.title, margin, y);
    let curX = margin + doc.getTextWidth(proj.title);

    // Links (GitHub / Live)
    if (proj.githubUrl) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text(' | ', curX, y);
      curX += doc.getTextWidth(' | ');

      doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
      doc.textWithLink('GitHub', curX, y, { url: proj.githubUrl });
      curX += doc.getTextWidth('GitHub');
    }

    if (proj.liveUrl) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text(' | ', curX, y);
      curX += doc.getTextWidth(' | ');

      doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
      doc.textWithLink('Live', curX, y, { url: proj.liveUrl });
      curX += doc.getTextWidth('Live');
    }

    // Date on right
    const dateText = proj.id === 'ipl-player-analysis' ? "Aug' 26" : proj.id === 'power-generation-dashboard' ? "May' 26" : "Jun' 26";
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(dateText, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    // Bullets
    proj.keyFeatures.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text('•', margin + 6, y);
      const split = doc.splitTextToSize(bullet, contentWidth - 18);
      doc.text(split, margin + 16, y);
      y += split.length * 8.4 + 1.0;
    });

    // Tech Stack
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text('Tech Stack: ', margin + 16, y);
    const tsWidth = doc.getTextWidth('Tech Stack: ');

    doc.setFont('helvetica', 'normal');
    const techStr = proj.technologies.join(', ');
    const splitTech = doc.splitTextToSize(techStr, contentWidth - 18 - tsWidth);
    doc.text(splitTech, margin + 16 + tsWidth, y);
    y += splitTech.length * 8.4 + 2.5;
  });

  // --- 3. INTERNSHIP ---
  addSectionHeader('Internship');

  INTERNSHIP_EXPERIENCE.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(black[0], black[1], black[2]);
    const roleLine = `${exp.company} | ${exp.role}`;
    doc.text(roleLine, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    exp.highlights.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text('•', margin + 6, y);
      const split = doc.splitTextToSize(bullet, contentWidth - 18);
      doc.text(split, margin + 16, y);
      y += split.length * 8.4 + 1.0;
    });
    y += 2.0;
  });

  // --- 4. CERTIFICATES ---
  addSectionHeader('Certificates');

  RESUME_CERTIFICATES.forEach((cert) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.0);
    doc.setTextColor(black[0], black[1], black[2]);
    
    // Line: Title || Issuer || Certificate
    const linePrefix = `•  ${cert.title} || ${cert.issuer} || `;
    doc.text(linePrefix, margin + 6, y);
    const prefixW = doc.getTextWidth(linePrefix);

    if (cert.credentialUrl) {
      doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
      doc.textWithLink('Certificate', margin + 6 + prefixW, y, { url: cert.credentialUrl });
    } else {
      doc.setTextColor(linkBlue[0], linkBlue[1], linkBlue[2]);
      doc.text('Certificate', margin + 6 + prefixW, y);
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(cert.date, pageWidth - margin, y, { align: 'right' });
    y += 9.0;
  });
  y += 2.0;

  // --- 5. EDUCATION ---
  addSectionHeader('Education');

  EDUCATION_LIST.forEach((edu) => {
    // Institution & Location
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(edu.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.0);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(edu.location, pageWidth - margin, y, { align: 'right' });
    y += 9.0;

    // Degree & Period
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.0);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(edu.degree, margin, y);

    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
    y += 8.5;

    // Major / Grade
    if (edu.major) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text(edu.major, margin, y);
      y += 8.5;
    } else if (edu.grade) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(black[0], black[1], black[2]);
      doc.text(edu.grade, margin, y);
      y += 8.5;
    }
    y += 2.0;
  });

  // Save the PDF
  doc.save(PERSONAL_INFO.resumeFileName);
}
