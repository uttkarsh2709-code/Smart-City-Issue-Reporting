import { Box } from '@mui/material';

const floatingIcons = [
  { top: '8%', left: '10%', delay: '0s' },
  { top: '14%', right: '12%', delay: '0.8s' },
  { bottom: '18%', left: '18%', delay: '0.4s' },
  { bottom: '20%', right: '20%', delay: '1.2s' }
];

export default function SmartCityIllustration({ compact = false }) {
  const scale = compact ? 0.82 : 1;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: compact ? 420 : 560,
        mx: 'auto',
        aspectRatio: '1.08',
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        filter: 'drop-shadow(0 24px 48px rgba(5, 12, 34, 0.35))'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '4% 0 0',
          borderRadius: 6,
          background: 'radial-gradient(circle at 30% 20%, rgba(128, 201, 255, 0.22), transparent 30%), radial-gradient(circle at 80% 25%, rgba(255, 182, 193, 0.2), transparent 25%), linear-gradient(145deg, rgba(49, 52, 136, 0.92), rgba(21, 24, 74, 0.95))',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '-20% -10% auto auto',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129, 106, 255, 0.28), transparent 65%)',
            animation: 'floatGlow 8s ease-in-out infinite'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 'auto 0 0',
            height: '34%',
            background: 'linear-gradient(180deg, rgba(13, 17, 55, 0.05), rgba(11, 14, 42, 0.7))'
          }}
        />

        {floatingIcons.map((icon, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: icon.top,
              bottom: icon.bottom,
              left: icon.left,
              right: icon.right,
              width: 44,
              height: 44,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff',
              fontSize: 22,
              animation: `floatBubble 4.5s ease-in-out ${icon.delay} infinite`
            }}
          >
            ✦
          </Box>
        ))}

        <Box sx={roadSx} />

        <Box sx={{ ...baseBuildingSx, left: '10%', bottom: '20%', width: '18%', height: '32%', background: buildingGradientA }}>
          <Box sx={windowGridSx} />
        </Box>
        <Box sx={{ ...baseBuildingSx, left: '28%', bottom: '16%', width: '15%', height: '38%', background: buildingGradientB }}>
          <Box sx={windowGridSx} />
        </Box>
        <Box sx={{ ...baseBuildingSx, left: '44%', bottom: '18%', width: '16%', height: '42%', background: buildingGradientC }}>
          <Box sx={windowGridSx} />
        </Box>
        <Box sx={{ ...baseBuildingSx, right: '16%', bottom: '19%', width: '17%', height: '35%', background: buildingGradientD }}>
          <Box sx={windowGridSx} />
        </Box>

        <Box sx={heroPlatformSx}>
          <Box sx={heroPanelSx} />
          <Box sx={heroDomeSx} />
          <Box sx={heroSignalSx} />
          <Box sx={heroSignalSx2} />
        </Box>

        <Box sx={cloudSx} style={{ top: '16%', left: '10%' }} />
        <Box sx={cloudSx} style={{ top: '22%', right: '14%' }} />
        <Box sx={cloudSx} style={{ bottom: '30%', left: '26%' }} />
      </Box>

      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-14px, 10px, 0); }
        }
      `}</style>
    </Box>
  );
}

const baseBuildingSx = {
  position: 'absolute',
  borderRadius: 4,
  bottom: '16%',
  boxShadow: 'inset 0 -10px 28px rgba(0, 0, 0, 0.22)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '10px 12px auto',
    height: '12px',
    borderRadius: '999px',
    background: 'rgba(255, 255, 255, 0.2)'
  }
};

const windowGridSx = {
  position: 'absolute',
  inset: '18% 14% 12%',
  borderRadius: 3,
  background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.24) 0 10px, transparent 10px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 10px, transparent 10px 22px)',
  opacity: 0.8
};

const roadSx = {
  position: 'absolute',
  inset: 'auto 0 10% ',
  height: '12%',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(17, 20, 58, 0.65))',
  clipPath: 'polygon(0 42%, 100% 8%, 100% 100%, 0 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '42% 10% auto',
    height: 4,
    borderRadius: 4,
    background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0 24px, transparent 24px 42px)'
  }
};

const heroPlatformSx = {
  position: 'absolute',
  left: '31%',
  bottom: '26%',
  width: '24%',
  height: '22%',
  display: 'grid',
  placeItems: 'end center',
  transform: 'translateY(10px)'
};

const heroPanelSx = {
  position: 'absolute',
  inset: 'auto 16% 8%',
  height: '62%',
  borderRadius: '28% 28% 18% 18%',
  background: 'linear-gradient(180deg, rgba(243, 166, 18, 0.95), rgba(255, 116, 141, 0.95))',
  boxShadow: '0 24px 40px rgba(243, 166, 18, 0.25)'
};

const heroDomeSx = {
  position: 'absolute',
  inset: '0 22% auto',
  height: '56%',
  borderRadius: '50% 50% 16% 16%',
  border: '10px solid rgba(255,255,255,0.82)',
  boxShadow: '0 0 0 8px rgba(96, 206, 255, 0.14)',
  background: 'linear-gradient(180deg, rgba(95, 193, 255, 0.25), rgba(20, 25, 69, 0.85))'
};

const heroSignalSx = {
  position: 'absolute',
  right: '24%',
  top: '4%',
  width: '18%',
  height: '50%',
  borderRadius: '50% 50% 10% 10%',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.08))',
  clipPath: 'polygon(40% 0, 100% 24%, 100% 100%, 0 100%, 0 24%)'
};

const heroSignalSx2 = {
  position: 'absolute',
  left: '24%',
  top: '2%',
  width: '16%',
  height: '58%',
  borderRadius: '50% 50% 10% 10%',
  background: 'linear-gradient(180deg, rgba(127, 192, 255, 0.95), rgba(255,255,255,0.1))',
  clipPath: 'polygon(0 20%, 60% 0, 100% 18%, 100% 100%, 0 100%)'
};

const cloudSx = {
  position: 'absolute',
  width: 64,
  height: 22,
  borderRadius: 999,
  background: 'rgba(255, 255, 255, 0.24)',
  filter: 'blur(0.2px)',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    background: 'inherit',
    borderRadius: '50%'
  },
  '&::before': {
    width: 28,
    height: 28,
    left: 10,
    top: -12
  },
  '&::after': {
    width: 24,
    height: 24,
    right: 8,
    top: -8
  }
};

const buildingGradientA = 'linear-gradient(180deg, rgba(248, 178, 103, 0.95), rgba(68, 90, 214, 0.96))';
const buildingGradientB = 'linear-gradient(180deg, rgba(255, 179, 193, 0.96), rgba(89, 112, 229, 0.96))';
const buildingGradientC = 'linear-gradient(180deg, rgba(88, 216, 245, 0.9), rgba(55, 73, 163, 0.98))';
const buildingGradientD = 'linear-gradient(180deg, rgba(173, 123, 255, 0.95), rgba(61, 72, 161, 0.98))';