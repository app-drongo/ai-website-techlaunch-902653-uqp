'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Rocket, Code, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';
import { Typed } from 'react-typed';
import Countdown from 'react-countdown';
import { Link } from 'react-scroll';

type BackgroundPattern = 'dots' | 'grid' | 'gradient';

const DEFAULT_HERO = {
  badge: '🚀 TechFlow v2.0 launching soon',
  title: 'Build the future with',
  titleHighlight: 'TechFlow',
  typedStrings: [
    'scalable platforms',
    'modern solutions',
    'cutting-edge tech',
    'seamless experiences',
  ],
  subtitle:
    'The complete platform for modern teams to design, build, and scale exceptional digital experiences with AI-powered tools and enterprise-grade infrastructure.',
  primaryCTA: 'Start Free Trial',
  secondaryCTA: 'Watch Demo',
  primaryCTAHref: '/signup',
  secondaryCTAHref: '/demo',
  feature1Icon: 'rocket',
  feature1Text: 'AI-Powered',
  feature2Icon: 'shield',
  feature2Text: 'Enterprise Secure',
  feature3Icon: 'code',
  feature3Text: 'Developer First',
  trustedByText: 'Trusted by 50,000+ developers worldwide',
  showTrustedLogos: true,
  backgroundPattern: 'dots' as BackgroundPattern,
  showAnimatedBadge: true,
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  showCountdown: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((event.clientX - rect.left - rect.width / 2) / 20);
      mouseY.set((event.clientY - rect.top - rect.height / 2) / 20);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'shield':
        return Shield;
      case 'globe':
        return Globe;
      case 'rocket':
        return Rocket;
      case 'code':
        return Code;
      case 'users':
        return Users;
      default:
        return Sparkles;
    }
  };

  const Feature1Icon = getIcon(config.feature1Icon);
  const Feature2Icon = getIcon(config.feature2Icon);
  const Feature3Icon = getIcon(config.feature3Icon);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-primary font-bold">🎉 TechFlow v2.0 is Live!</span>;
    } else {
      return (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Launch in:</span>
          <div className="flex gap-2">
            <div className="bg-primary/10 rounded px-2 py-1">
              <span className="font-mono font-bold text-primary">{days}d</span>
            </div>
            <div className="bg-primary/10 rounded px-2 py-1">
              <span className="font-mono font-bold text-primary">{hours}h</span>
            </div>
            <div className="bg-primary/10 rounded px-2 py-1">
              <span className="font-mono font-bold text-primary">{minutes}m</span>
            </div>
            <div className="bg-primary/10 rounded px-2 py-1">
              <span className="font-mono font-bold text-primary">{seconds}s</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      data-editable="hero"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0"
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: 'hsl(var(--primary))',
            },
            links: {
              color: 'hsl(var(--primary))',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Background Pattern */}
      {config.backgroundPattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03]" />
      )}
      {config.backgroundPattern === 'grid' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px]" />
      )}
      {config.backgroundPattern === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.05]" />
      )}

      {/* Floating gradient orbs with parallax */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl"
        style={{ y, x: springX, rotateZ: springX }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']), x: springY }}
      />

      <motion.div
        className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10"
        style={{ opacity }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
          {/* Animated Badge with Framer Motion */}
          {config.showAnimatedBadge && (
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(var(--primary), 0)',
                    '0 0 0 10px rgba(var(--primary), 0.1)',
                    '0 0 0 0 rgba(var(--primary), 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>
                <span data-editable="badge" className="text-muted-foreground">
                  {config.badge}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Countdown Timer */}
          {config.showCountdown && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Countdown date={config.launchDate} renderer={countdownRenderer} />
            </motion.div>
          )}

          {/* Main Title with Staggered Animation */}
          <motion.h1
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              data-editable="title"
              className="text-foreground block"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {config.title}
            </motion.span>
            <motion.span
              className="relative ml-3 block mt-2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span
                data-editable="titleHighlight"
                className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent"
              >
                {config.titleHighlight}
              </span>
              <motion.svg
                className="absolute -right-2 -top-2 h-6 w-6 text-primary/60"
                fill="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            </motion.span>
          </motion.h1>

          {/* Typed Animation */}
          <motion.div
            className="mt-4 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Typed
              strings={config.typedStrings}
              typeSpeed={50}
              backSpeed={30}
              backDelay={2000}
              loop
              className="text-xl text-primary font-medium"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            data-editable="subtitle"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {config.subtitle}
          </motion.p>

          {/* Feature Pills with Floating Animation */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { Icon: Feature1Icon, text: config.feature1Text, editableKey: 'feature1Text' },
              { Icon: Feature2Icon, text: config.feature2Text, editableKey: 'feature2Text' },
              { Icon: Feature3Icon, text: config.feature3Text, editableKey: 'feature3Text' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                style={{
                  x: useTransform(springX, [-100, 100], [-5 * (index + 1), 5 * (index + 1)]),
                  y: useTransform(springY, [-100, 100], [-3 * (index + 1), 3 * (index + 1)]),
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.Icon className="h-4 w-4 text-primary" />
                <span data-editable={feature.editableKey} className="text-muted-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate(config.primaryCTAHref)}
                data-editable-href="primaryCTAHref"
                data-href={config.primaryCTAHref}
              >
                <span data-editable="primaryCTA">{config.primaryCTA}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 backdrop-blur-sm text-base font-medium hover:bg-background/50 transition-all"
                onClick={() => navigate(config.secondaryCTAHref)}
                data-editable-href="secondaryCTAHref"
                data-href={config.secondaryCTAHref}
              >
                <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          {config.showTrustedLogos && (
            <motion.div
              className="mt-20 w-full max-w-4xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <p data-editable="trustedByText" className="mb-6 text-sm text-muted-foreground">
                {config.trustedByText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                {/* Placeholder for logos - in production these would be actual logos */}
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded bg-muted-foreground/10"
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <Link to="features" smooth={true} duration={800} className="cursor-pointer">
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs">Scroll to explore</span>
                <ArrowRight className="h-4 w-4 rotate-90" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
