import React from 'react'

type Props = {
  label: string
  icon?: React.ReactNode
  variant?: 'accent' | 'location' | 'virtual'
}

export default function Badge({ label, icon, variant = 'accent' }: Props) {
  return (
    <div className={"badge " + variant}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}</span>

      <style jsx>{`
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(6,6,15,0.06);
          color: #1b1630;
          font-weight: 700;
          font-size: 14px;
        }

        .icon {
          display: inline-grid;
          place-items: center;
          width: 28px;
          height: 28px;
        }

        .icon svg { width: 20px; height: 20px; display: block; }

        .accent .icon svg { fill: url(#gradAccent) || #6e3bd3; }
        .location .icon svg { fill: #ff9f43; }
        .virtual .icon svg { fill: #2196f3; }

        /* subtle variant tint for badge background */
        .accent { background: linear-gradient(180deg, rgba(124,58,237,0.04), rgba(124,58,237,0.02)); border-color: rgba(124,58,237,0.08); }
        .location { background: linear-gradient(180deg, rgba(255,159,67,0.04), rgba(255,159,67,0.02)); border-color: rgba(255,159,67,0.08); }
        .virtual { background: linear-gradient(180deg, rgba(33,150,243,0.04), rgba(33,150,243,0.02)); border-color: rgba(33,150,243,0.08); }

        @media (max-width: 768px) {
          .badge { font-size: 13px; padding: 7px 12px; }
          .icon { width: 24px; height: 24px; }
        }
      `}</style>
    </div>
  )
}
