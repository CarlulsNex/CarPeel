import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0A0E17",
  card: "#131927",
  cardHover: "#1A2236",
  accent: "#00E59B",
  accentDark: "#00B87A",
  accentGlow: "rgba(0, 229, 155, 0.15)",
  text: "#F0F2F5",
  textMuted: "#7A8499",
  textDim: "#4A5568",
  danger: "#FF5A5A",
  warning: "#FFB84D",
  star: "#FFD700",
  divider: "#1E2A3A",
  inputBg: "#0D1220",
};

const StatusBadge = ({ type }) => {
  const styles = {
    online: { bg: COLORS.accent, label: "Online" },
    riding: { bg: COLORS.warning, label: "Em viagem" },
    waiting: { bg: "#5B8DEF", label: "Aguardando" },
  };
  const s = styles[type] || styles.online;
  return (
    <span style={{ background: s.bg + "22", color: s.bg, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
      {s.label}
    </span>
  );
};

const StarRating = ({ rating }) => (
  <span style={{ color: COLORS.star, fontSize: 12, letterSpacing: 1 }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: COLORS.textMuted, marginLeft: 4, fontSize: 11 }}>{rating.toFixed(1)}</span>
  </span>
);

const Avatar = ({ name, size = 44, color = COLORS.accent }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    background: `linear-gradient(135deg, ${color}33, ${color}11)`, border: `2px solid ${color}44`,
    color: color, fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
  }}>
    {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
  </div>
);

const BottomNav = ({ active, onNavigate }) => {
  const items = [
    { id: "home", icon: "🏠", label: "Início" },
    { id: "search", icon: "🔍", label: "Buscar" },
    { id: "rides", icon: "🚗", label: "Viagens" },
    { id: "profile", icon: "👤", label: "Perfil" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", padding: "10px 0 18px",
      background: COLORS.card, borderTop: `1px solid ${COLORS.divider}`,
      position: "sticky", bottom: 0,
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onNavigate(it.id)} style={{
          background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          color: active === it.id ? COLORS.accent : COLORS.textDim, cursor: "pointer", fontSize: 20, padding: "4px 12px",
          transition: "color 0.2s",
        }}>
          <span>{it.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 600 }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
};

const mockRides = [
  { id: 1, driver: "Lucas Martins", from: "Centro, Palhoça", to: "Unisul - Pedra Branca", time: "07:30", seats: 2, price: 6.5, rating: 4.8, status: "waiting", badge: "Motorista Top", distance: "12 km", type: "carona" },
  { id: 2, driver: "Ana Clara", from: "Kobrasol", to: "Unisul - Pedra Branca", time: "07:45", seats: 3, price: 4.0, rating: 4.5, status: "online", badge: null, distance: "8 km", type: "racha" },
  { id: 3, driver: "Pedro Henrique", from: "Barra do Aririu", to: "Unisul - Pedra Branca", time: "08:00", seats: 1, price: 8.0, rating: 4.9, status: "online", badge: "Bom Passageiro", distance: "15 km", type: "carona" },
  { id: 4, driver: "Mariana Silva", from: "Ponte do Imaruim", to: "Unisul - Pedra Branca", time: "12:15", seats: 2, price: 5.0, rating: 4.2, status: "waiting", badge: null, distance: "6 km", type: "racha" },
];

const mockHistory = [
  { id: 101, driver: "Carlos Eduardo", from: "Centro", to: "Unisul", date: "27/04", price: 5.5, rating: 5, type: "racha" },
  { id: 102, driver: "Julia Santos", from: "Kobrasol", to: "Unisul", date: "25/04", price: 7.0, rating: 4, type: "carona" },
];

// ─── SCREENS ───

const SplashScreen = ({ onContinue }) => {
  useEffect(() => { const t = setTimeout(onContinue, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at 50% 40%, ${COLORS.accentGlow}, transparent 60%), ${COLORS.bg}`,
    }}>
      <div style={{ animation: "fadeInUp 0.8s ease-out" }}>
        <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, color: COLORS.text, fontFamily: "'Outfit', sans-serif" }}>
          Car<span style={{ color: COLORS.accent }}>Peel</span>
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 13, textAlign: "center", marginTop: 8, letterSpacing: 2, textTransform: "uppercase" }}>
          Mobilidade Colaborativa
        </div>
      </div>
      <div style={{ marginTop: 60, width: 28, height: 28, border: `2px solid ${COLORS.accent}44`, borderTop: `2px solid ${COLORS.accent}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [tab, setTab] = useState("login");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: COLORS.bg, padding: "0 24px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>
          Car<span style={{ color: COLORS.accent }}>Peel</span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 32 }}>Divida viagens. Economize. Conecte-se.</p>

        <div style={{ display: "flex", gap: 0, marginBottom: 28, background: COLORS.card, borderRadius: 12, padding: 3 }}>
          {["login", "cadastro"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: tab === t ? COLORS.accent : "transparent", color: tab === t ? COLORS.bg : COLORS.textMuted,
              transition: "all 0.25s",
            }}>
              {t === "login" ? "Entrar" : "Cadastrar"}
            </button>
          ))}
        </div>

        {["E-mail universitário", tab === "login" ? "Senha" : "Criar senha"].map((ph, i) => (
          <input key={i} placeholder={ph} type={i === 1 ? "password" : "email"} style={{
            width: "100%", padding: "14px 16px", marginBottom: 12, border: `1px solid ${COLORS.divider}`, borderRadius: 12,
            background: COLORS.inputBg, color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box",
          }} />
        ))}

        {tab === "cadastro" && (
          <input placeholder="Nome completo" style={{
            width: "100%", padding: "14px 16px", marginBottom: 12, border: `1px solid ${COLORS.divider}`, borderRadius: 12,
            background: COLORS.inputBg, color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box",
          }} />
        )}

        <button onClick={onLogin} style={{
          width: "100%", padding: "15px 0", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700,
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`, color: COLORS.bg,
          marginTop: 8, transition: "transform 0.2s", boxShadow: `0 4px 20px ${COLORS.accent}33`,
        }}>
          {tab === "login" ? "Entrar" : "Criar Conta"}
        </button>

        {tab === "login" && (
          <p style={{ textAlign: "center", color: COLORS.textDim, fontSize: 12, marginTop: 16, cursor: "pointer" }}>
            Esqueceu a senha?
          </p>
        )}
      </div>
    </div>
  );
};

const HomeScreen = ({ onNavigate, onSelectRide }) => (
  <div style={{ padding: "0 16px 16px", overflowY: "auto", flex: 1 }}>
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 16px" }}>
      <div>
        <div style={{ color: COLORS.textMuted, fontSize: 12 }}>Olá 👋</div>
        <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Fernando</div>
      </div>
      <Avatar name="Fernando L" size={40} />
    </div>

    {/* Quick Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
      {[
        { label: "Economizou", value: "R$ 87", icon: "💰" },
        { label: "Viagens", value: "14", icon: "🚗" },
        { label: "CO₂ evitado", value: "12kg", icon: "🌱" },
      ].map((s, i) => (
        <div key={i} style={{
          background: COLORS.card, borderRadius: 14, padding: "14px 12px", textAlign: "center",
          border: `1px solid ${COLORS.divider}`,
        }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
          <div style={{ color: COLORS.accent, fontSize: 18, fontWeight: 700 }}>{s.value}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 10, marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Quick Action */}
    <button onClick={() => onNavigate("search")} style={{
      width: "100%", padding: "16px", borderRadius: 14, cursor: "pointer",
      background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}08)`,
      border: `1px solid ${COLORS.accent}33`, display: "flex", alignItems: "center", gap: 12,
      marginBottom: 24, transition: "all 0.2s",
    }}>
      <span style={{ fontSize: 28 }}>🧭</span>
      <div style={{ textAlign: "left" }}>
        <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>Encontrar Viagem</div>
        <div style={{ color: COLORS.textMuted, fontSize: 12 }}>Busque viagens próximas agora</div>
      </div>
      <span style={{ marginLeft: "auto", color: COLORS.accent, fontSize: 18 }}>→</span>
    </button>

    {/* Available Rides */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700 }}>Viagens Disponíveis</span>
      <span onClick={() => onNavigate("search")} style={{ color: COLORS.accent, fontSize: 12, cursor: "pointer" }}>Ver todas →</span>
    </div>

    {mockRides.slice(0, 3).map(ride => (
      <div key={ride.id} onClick={() => onSelectRide(ride)} style={{
        background: COLORS.card, borderRadius: 14, padding: "14px 16px", marginBottom: 10,
        border: `1px solid ${COLORS.divider}`, cursor: "pointer", transition: "all 0.2s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Avatar name={ride.driver} size={38} color={ride.type === "carona" ? COLORS.accent : "#5B8DEF"} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{ride.driver}</span>
              <StatusBadge type={ride.status} />
            </div>
            <StarRating rating={ride.rating} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: COLORS.accent, fontSize: 16, fontWeight: 700 }}>R$ {ride.price.toFixed(2)}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 11 }}>/pessoa</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
          <span style={{ color: COLORS.accent }}>●</span>
          <span style={{ color: COLORS.textMuted, flex: 1 }}>{ride.from}</span>
          <span style={{ color: COLORS.textDim }}>─────</span>
          <span style={{ color: COLORS.warning }}>◆</span>
          <span style={{ color: COLORS.textMuted, flex: 1 }}>{ride.to}</span>
          <span style={{ color: COLORS.textDim, fontSize: 11 }}>⏰ {ride.time}</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <span style={{
            background: ride.type === "carona" ? `${COLORS.accent}18` : "#5B8DEF18",
            color: ride.type === "carona" ? COLORS.accent : "#5B8DEF",
            padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, textTransform: "uppercase",
          }}>
            {ride.type === "carona" ? "🚗 Carona" : "💰 Racha"}
          </span>
          <span style={{ background: `${COLORS.textDim}22`, color: COLORS.textMuted, padding: "2px 10px", borderRadius: 20, fontSize: 10 }}>
            {ride.seats} vaga{ride.seats > 1 ? "s" : ""}
          </span>
          {ride.badge && (
            <span style={{ background: `${COLORS.star}18`, color: COLORS.star, padding: "2px 10px", borderRadius: 20, fontSize: 10 }}>
              🏆 {ride.badge}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

const SearchScreen = ({ onSelectRide }) => {
  const [filter, setFilter] = useState("todas");
  const filtered = filter === "todas" ? mockRides : mockRides.filter(r => r.type === filter);
  return (
    <div style={{ padding: "0 16px 16px", overflowY: "auto", flex: 1 }}>
      <div style={{ padding: "20px 0 12px" }}>
        <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 14 }}>Buscar Viagens</div>
        <div style={{
          display: "flex", gap: 0, background: COLORS.card, borderRadius: 12, padding: 3, marginBottom: 16,
          border: `1px solid ${COLORS.divider}`,
        }}>
          <input placeholder="De onde?" style={{
            flex: 1, padding: "12px 14px", border: "none", background: "transparent", color: COLORS.text, fontSize: 13, outline: "none",
          }} />
          <div style={{ width: 1, background: COLORS.divider, margin: "6px 0" }} />
          <input placeholder="Para onde?" defaultValue="Unisul - Pedra Branca" style={{
            flex: 1, padding: "12px 14px", border: "none", background: "transparent", color: COLORS.text, fontSize: 13, outline: "none",
          }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["todas", "carona", "racha"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: filter === f ? COLORS.accent : COLORS.card, color: filter === f ? COLORS.bg : COLORS.textMuted,
              transition: "all 0.2s", textTransform: "capitalize",
            }}>
              {f === "todas" ? "Todas" : f === "carona" ? "🚗 Caronas" : "💰 Rachas"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 10 }}>{filtered.length} viagens encontradas</div>
      {filtered.map(ride => (
        <div key={ride.id} onClick={() => onSelectRide(ride)} style={{
          background: COLORS.card, borderRadius: 14, padding: "14px 16px", marginBottom: 10,
          border: `1px solid ${COLORS.divider}`, cursor: "pointer",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Avatar name={ride.driver} size={38} color={ride.type === "carona" ? COLORS.accent : "#5B8DEF"} />
            <div style={{ flex: 1 }}>
              <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{ride.driver}</span>
              <div><StarRating rating={ride.rating} /></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: COLORS.accent, fontSize: 16, fontWeight: 700 }}>R$ {ride.price.toFixed(2)}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 10 }}>{ride.distance}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted }}>
            <span style={{ color: COLORS.accent }}>●</span> {ride.from}
            <span style={{ margin: "0 4px" }}>→</span>
            <span style={{ color: COLORS.warning }}>◆</span> {ride.to}
            <span style={{ marginLeft: "auto" }}>⏰ {ride.time}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <span style={{
              background: ride.type === "carona" ? `${COLORS.accent}18` : "#5B8DEF18",
              color: ride.type === "carona" ? COLORS.accent : "#5B8DEF",
              padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600,
            }}>
              {ride.type === "carona" ? "🚗 Carona" : "💰 Racha"}
            </span>
            <span style={{ background: `${COLORS.textDim}22`, color: COLORS.textMuted, padding: "2px 10px", borderRadius: 20, fontSize: 10 }}>
              {ride.seats} vaga{ride.seats > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const RideDetailScreen = ({ ride, onBack, onBook }) => {
  const [booked, setBooked] = useState(false);
  return (
    <div style={{ padding: "0 16px 16px", overflowY: "auto", flex: 1 }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 14, padding: "20px 0 12px",
        fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
      }}>
        ← Voltar
      </button>

      <div style={{
        background: COLORS.card, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.divider}`, marginBottom: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <Avatar name={ride.driver} size={54} color={ride.type === "carona" ? COLORS.accent : "#5B8DEF"} />
          <div>
            <div style={{ color: COLORS.text, fontSize: 18, fontWeight: 700 }}>{ride.driver}</div>
            <StarRating rating={ride.rating} />
            {ride.badge && (
              <div style={{ color: COLORS.star, fontSize: 11, marginTop: 4 }}>🏆 {ride.badge}</div>
            )}
          </div>
        </div>

        <div style={{ background: COLORS.inputBg, borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.accent }} />
            <div>
              <div style={{ color: COLORS.textMuted, fontSize: 10 }}>ORIGEM</div>
              <div style={{ color: COLORS.text, fontSize: 14 }}>{ride.from}</div>
            </div>
          </div>
          <div style={{ borderLeft: `2px dashed ${COLORS.divider}`, height: 20, marginLeft: 4 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.warning, transform: "rotate(45deg)" }} />
            <div>
              <div style={{ color: COLORS.textMuted, fontSize: 10 }}>DESTINO</div>
              <div style={{ color: COLORS.text, fontSize: 14 }}>{ride.to}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Horário", value: ride.time, icon: "⏰" },
            { label: "Distância", value: ride.distance, icon: "📍" },
            { label: "Vagas", value: ride.seats.toString(), icon: "💺" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 700 }}>{item.value}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 10 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: COLORS.card, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.divider}`, marginBottom: 16,
        textAlign: "center",
      }}>
        <div style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 4 }}>Valor por pessoa</div>
        <div style={{ color: COLORS.accent, fontSize: 36, fontWeight: 800 }}>R$ {ride.price.toFixed(2)}</div>
        <div style={{
          background: ride.type === "carona" ? `${COLORS.accent}18` : "#5B8DEF18",
          color: ride.type === "carona" ? COLORS.accent : "#5B8DEF",
          padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-block", marginTop: 8,
        }}>
          {ride.type === "carona" ? "🚗 Carona Direta" : "💰 Racha de App"}
        </div>
      </div>

      {/* Safety Info */}
      <div style={{
        background: `${COLORS.accent}08`, borderRadius: 14, padding: 14, border: `1px solid ${COLORS.accent}22`, marginBottom: 20,
      }}>
        <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>🛡️ Segurança</div>
        <div style={{ color: COLORS.textMuted, fontSize: 11, lineHeight: 1.6 }}>
          Usuário verificado via e-mail institucional • Avaliação {ride.rating}/5 • Documentos validados
        </div>
      </div>

      <button onClick={() => { setBooked(true); setTimeout(() => onBook && onBook(), 1500); }} disabled={booked} style={{
        width: "100%", padding: "16px 0", border: "none", borderRadius: 14, cursor: booked ? "default" : "pointer",
        fontSize: 16, fontWeight: 700,
        background: booked ? `${COLORS.accent}44` : `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
        color: booked ? COLORS.accent : COLORS.bg, transition: "all 0.3s",
        boxShadow: booked ? "none" : `0 4px 24px ${COLORS.accent}33`,
      }}>
        {booked ? "✓ Solicitação Enviada!" : "Solicitar Viagem"}
      </button>
    </div>
  );
};

const RidesScreen = () => (
  <div style={{ padding: "0 16px 16px", overflowY: "auto", flex: 1 }}>
    <div style={{ padding: "20px 0 16px" }}>
      <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Minhas Viagens</div>
    </div>

    <div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
      Próxima viagem
    </div>
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.accent}12, ${COLORS.accent}06)`,
      borderRadius: 14, padding: 16, border: `1px solid ${COLORS.accent}33`, marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Avatar name="Lucas Martins" size={36} />
        <div style={{ flex: 1 }}>
          <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>Lucas Martins</div>
          <div style={{ color: COLORS.accent, fontSize: 12 }}>Hoje, 07:30</div>
        </div>
        <StatusBadge type="waiting" />
      </div>
      <div style={{ color: COLORS.textMuted, fontSize: 12 }}>Centro, Palhoça → Unisul - Pedra Branca</div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button style={{
          flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: COLORS.accent, color: COLORS.bg,
          fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>💬 Chat</button>
        <button style={{
          flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: `${COLORS.danger}22`, color: COLORS.danger,
          fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>Cancelar</button>
      </div>
    </div>

    <div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
      Histórico
    </div>
    {mockHistory.map(h => (
      <div key={h.id} style={{
        background: COLORS.card, borderRadius: 12, padding: 14, marginBottom: 8,
        border: `1px solid ${COLORS.divider}`, display: "flex", alignItems: "center", gap: 12,
      }}>
        <Avatar name={h.driver} size={36} color={COLORS.textDim} />
        <div style={{ flex: 1 }}>
          <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{h.driver}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{h.from} → {h.to} • {h.date}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>R$ {h.price.toFixed(2)}</div>
          <div style={{ color: COLORS.star, fontSize: 10 }}>{"★".repeat(h.rating)}</div>
        </div>
      </div>
    ))}
  </div>
);

const ProfileScreen = () => {
  const achievements = [
    { icon: "🚗", label: "Primeira Viagem", earned: true },
    { icon: "⭐", label: "Nota 5.0", earned: true },
    { icon: "🌱", label: "Eco Friendly", earned: true },
    { icon: "🔥", label: "10 Viagens", earned: true },
    { icon: "🏆", label: "Motorista Top", earned: false },
    { icon: "💎", label: "50 Viagens", earned: false },
  ];
  return (
    <div style={{ padding: "0 16px 16px", overflowY: "auto", flex: 1 }}>
      <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
        <Avatar name="Fernando L" size={72} />
        <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, marginTop: 12, fontFamily: "'Outfit', sans-serif" }}>
          Fernando Riephoff
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>fernando.luppi@unisul.br</div>
        <div style={{ marginTop: 8 }}><StarRating rating={4.8} /></div>
        <div style={{
          display: "inline-block", marginTop: 8, background: `${COLORS.accent}15`, color: COLORS.accent,
          padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
        }}>
          ✓ Verificado • Unisul
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Viagens", value: "14" },
          { label: "Avaliações", value: "12" },
          { label: "Economia", value: "R$ 87" },
        ].map((s, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 12, padding: 14, textAlign: "center",
            border: `1px solid ${COLORS.divider}`,
          }}>
            <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 10, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🏆 Conquistas</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
        {achievements.map((a, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 12, padding: "12px 8px", textAlign: "center",
            border: `1px solid ${a.earned ? COLORS.accent + "33" : COLORS.divider}`,
            opacity: a.earned ? 1 : 0.4,
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
            <div style={{ color: a.earned ? COLORS.text : COLORS.textDim, fontSize: 10, fontWeight: 600 }}>{a.label}</div>
          </div>
        ))}
      </div>

      <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Configurações</div>
      {["Editar Perfil", "Documentos", "Preferências de Viagem", "Notificações", "Termos de Uso", "Sair"].map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0",
          borderBottom: i < 5 ? `1px solid ${COLORS.divider}` : "none", cursor: "pointer",
        }}>
          <span style={{ color: i === 5 ? COLORS.danger : COLORS.text, fontSize: 14 }}>{item}</span>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>›</span>
        </div>
      ))}
    </div>
  );
};

// ─── APP ───

export default function CarPeel() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRide, setSelectedRide] = useState(null);

  const handleNavigate = (tab) => {
    setSelectedRide(null);
    setActiveTab(tab);
  };

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
  };

  const renderScreen = () => {
    if (screen === "splash") return <SplashScreen onContinue={() => setScreen("login")} />;
    if (screen === "login") return <LoginScreen onLogin={() => setScreen("app")} />;
    if (selectedRide) return <RideDetailScreen ride={selectedRide} onBack={() => setSelectedRide(null)} />;
    switch (activeTab) {
      case "home": return <HomeScreen onNavigate={handleNavigate} onSelectRide={handleSelectRide} />;
      case "search": return <SearchScreen onSelectRide={handleSelectRide} />;
      case "rides": return <RidesScreen />;
      case "profile": return <ProfileScreen />;
      default: return <HomeScreen onNavigate={handleNavigate} onSelectRide={handleSelectRide} />;
    }
  };

  return (
    <div style={{
      maxWidth: 390, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column",
      background: COLORS.bg, fontFamily: "'Outfit', 'Segoe UI', sans-serif", overflow: "hidden",
      borderLeft: `1px solid ${COLORS.divider}`, borderRight: `1px solid ${COLORS.divider}`,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; scrollbar-width: thin; scrollbar-color: ${COLORS.divider} transparent; }
        input::placeholder { color: ${COLORS.textDim}; }
      `}</style>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {renderScreen()}
        </div>
        {screen === "app" && !selectedRide && <BottomNav active={activeTab} onNavigate={handleNavigate} />}
      </div>
    </div>
  );
}
