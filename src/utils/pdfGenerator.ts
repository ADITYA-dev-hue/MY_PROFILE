import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, RESUME_CERTIFICATES } from '../data/portfolioData';

/**
 * Generates and downloads an ATS-compliant, pixel-precise single-page PDF Resume
 * matching Aditya Prakash's exact new resume template.
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

  let y = 36;

  // Colors
  const black = [0, 0, 0];
  const darkGray = [40, 40, 40];

  // 1. Header: Name & Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text('Aditya Prakash', pageWidth / 2, y, { align: 'center' });
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  // Contact Row 1
  const contactRow1 = `LinkedIn: ${PERSONAL_INFO.linkedin}       Email: ${PERSONAL_INFO.email}`;
  doc.text(contactRow1, pageWidth / 2, y, { align: 'center' });
  y += 11;

  // Contact Row 2
  const contactRow2 = `Github: ${PERSONAL_INFO.github}       Mobile: ${PERSONAL_INFO.phone}`;
  doc.text(contactRow2, pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Section Header helper
  function addSectionHeader(title: string) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(black[0], black[1], black[2]);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;
  }

  // --- 1. SKILLS ---
  addSectionHeader('Skills');

  const skillsList = [
    { label: 'Languages:', val: 'C++, Python, C, Java, SQL' },
    { label: 'Tools/Platforms:', val: 'Pandas, NumPy, Matplotlib, Scikit-learn, Tableau, Power BI, Excel' },
    { label: 'Concepts:', val: 'Machine Learning, Data Visualisation, Data Cleaning, Statistics' },
    { label: 'Soft Skills:', val: 'Adaptability, Time Management' },
  ];

  skillsList.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.text(sk.label, margin, y);
    const lw = doc.getTextWidth(sk.label + ' ');
    doc.setFont('helvetica', 'normal');
    const split = doc.splitTextToSize(sk.val, contentWidth - lw);
    doc.text(split, margin + lw, y);
    y += split.length * 8.8 + 1.2;
  });
  y += 3;

  // --- 2. PROJECTS ---
  addSectionHeader('Projects');

  const projectsData = [
    {
      title: 'IPL Player Analysis',
      tech: 'React, TypeScript, TanStack, Vite, Tailwind CSS, Chart.js, Recharts, Three.js',
      date: "Aug' 26",
      bullets: [
        'Analyzed IPL data covering 760+ players across 10 franchises to provide insights into batting, bowling, rankings, and overall player performance.',
        'Integrated CSV-based IPL data and created interactive KPIs, charts, player ratings, and performance comparisons for easier player evaluation.',
        'Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.',
      ],
    },
    {
      title: 'Power Generation Dashboard (2011-2017)',
      tech: 'Power BI, Excel, NDAP Dataset',
      date: "May' 26",
      bullets: [
        'Analyzed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.',
        'Visualized power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters.',
        'Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.',
      ],
    },
    {
      title: 'EduPrep AI Learning Platform',
      tech: 'HTML, CSS, JavaScript, Gemini API',
      date: "Jun' 26",
      bullets: [
        'Created an AI-powered learning platform using HTML, CSS, JavaScript, and Gemini API.',
        'Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features.',
        'Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.',
      ],
    },
  ];

  projectsData.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    const titleText = `${proj.title} | `;
    doc.text(titleText, margin, y);
    const titleWidth = doc.getTextWidth(titleText);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    // Draw date on right
    doc.setFont('helvetica', 'italic');
    doc.text(proj.date, pageWidth - margin, y, { align: 'right' });

    // Draw tech after title
    doc.setFont('helvetica', 'normal');
    const availableTechWidth = contentWidth - titleWidth - 55;
    const splitTech = doc.splitTextToSize(proj.tech, availableTechWidth);
    doc.text(splitTech[0] || proj.tech, margin + titleWidth, y);
    y += 9.5;

    proj.bullets.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.0);
      doc.text('•', margin + 8, y);
      const split = doc.splitTextToSize(bullet, contentWidth - 20);
      doc.text(split, margin + 18, y);
      y += split.length * 8.6 + 1;
    });
    y += 2.5;
  });

  // --- 3. TRAINING ---
  addSectionHeader('Training');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Uplyx Solution | Full Stack Web Development Intern', margin, y);
  doc.setFont('helvetica', 'italic');
  doc.text("Aug' 26 – Present", pageWidth - margin, y, { align: 'right' });
  y += 9.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('Data Science using Python', margin, y);
  y += 9;

  const trainingBullets = [
    'Worked on industry-oriented projects as part of a structured Full Stack Web Development internship, applying concepts through practical assignments and project-based tasks.',
    'Gained hands-on experience with frontend and web development workflows while working with professional tools, methodologies, and problem-solving approaches.',
    'Applied technical concepts to practical projects, strengthening skills in web development and gaining exposure to real-world industry practices.',
  ];

  trainingBullets.forEach((bullet) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.0);
    doc.text('•', margin + 8, y);
    const split = doc.splitTextToSize(bullet, contentWidth - 20);
    doc.text(split, margin + 18, y);
    y += split.length * 8.6 + 1;
  });
  y += 2.5;

  // --- 4. CERTIFICATES ---
  addSectionHeader('Certificates');

  RESUME_CERTIFICATES.forEach((cert) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.text(`•  ${cert.title} — ${cert.issuer}`, margin + 8, y);
    doc.setFont('helvetica', 'italic');
    doc.text(cert.date, pageWidth - margin, y, { align: 'right' });
    y += 9.2;
  });
  y += 2.5;

  // --- 5. EDUCATION ---
  addSectionHeader('Education');

  // LPU
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Lovely Professional University', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Phagwara, Punjab', pageWidth - margin, y, { align: 'right' });
  y += 9.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('Bachelor of Technology', margin, y);
  doc.text("Aug' 24 – Present", pageWidth - margin, y, { align: 'right' });
  y += 9.0;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.0);
  doc.text('Computer Science and Engineering; CGPA: 8.53', margin, y);
  y += 10.5;

  // KV
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Kendriya Vidyalaya Bathinda Cantt', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Bathinda Cantt, Punjab', pageWidth - margin, y, { align: 'right' });
  y += 9.5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('Class XII – Science | Percentage: 71.5%', margin, y);
  doc.text("Mar' 23 – May' 24", pageWidth - margin, y, { align: 'right' });

  // Save the PDF
  doc.save(PERSONAL_INFO.resumeFileName);
}
