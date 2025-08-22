export default function ContactSection() {
  return (
    <div
      className="text-base space-y-2"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div>----------------------------------------------</div>
      <div>
        <span role="img" aria-label="icon">
          📢
        </span>
        MEZON – YOUR COMMUNITY, YOUR RULES!
        <br />A product proudly developed by the engineers at NCCPLUS VIETNAM.
      </div>

      <div>
        <span role="img" aria-label="globe">
          🌐
        </span>
        Website:{' '}
        <a
          href="https://mezon.ai/"
          target="_blank"
          className="text-blue-600 underline"
        >
          https://mezon.ai/
        </a>
      </div>

      <div>
        <span role="img" aria-label="email">
          📧
        </span>
        Email:{' '}
        <a href="mailto:info@ncc.asia" className="text-blue-600 underline">
          info@ncc.asia
        </a>
      </div>

      <div>
        <span role="img" aria-label="phone">
          📞
        </span>
        Hotline: 024.6687.4606
      </div>
    </div>
  );
}
