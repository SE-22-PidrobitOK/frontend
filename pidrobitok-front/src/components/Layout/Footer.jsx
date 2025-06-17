import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
  Work,
  Business,
  People
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerLinks = {
    forJobSeekers: [
      { label: 'Пошук роботи', href: '/vacancies' },
      { label: 'Створити резюме', href: '/create-resume' },
      { label: 'Поради з кар\'єри', href: '/career-tips' },
      { label: 'Зарплатний калькулятор', href: '/salary-calculator' }
    ],
    forEmployers: [
      { label: 'Розмістити вакансію', href: '/post-job' },
      { label: 'Пошук кандидатів', href: '/search-candidates' },
      { label: 'Тарифи', href: '/pricing' },
      { label: 'Для HR', href: '/hr-solutions' }
    ],
    company: [
      { label: 'Про нас', href: '/about' },
      { label: 'Контакти', href: '/contacts' },
      { label: 'Блог', href: '/blog' },
      { label: 'Вакансії в нас', href: '/jobs-at-company' }
    ],
    support: [
      { label: 'Центр допомоги', href: '/help' },
      { label: 'Правила користування', href: '/terms' },
      { label: 'Політика конфіденційності', href: '/privacy' },
      { label: 'Зворотний зв\'язок', href: '/feedback' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram />, href: '#', label: 'Instagram' }
  ];

  const contactInfo = [
    { icon: <Email />, text: 'info@jobportal.com', href: 'mailto:info@jobportal.com' },
    { icon: <Phone />, text: '+38 (044) 123-45-67', href: 'tel:+380441234567' },
    { icon: <LocationOn />, text: 'Київ, вул. Хрещатик, 1', href: '#' }
  ];

  const stats = [
    { icon: <Work />, number: '50,000+', label: 'Вакансій' },
    { icon: <Business />, number: '5,000+', label: 'Компаній' },
    { icon: <People />, number: '200,000+', label: 'Кандидатів' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1c2526',
        color: 'white',
        mt: 'auto'
      }}
    >
      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#2c3537', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: '#4caf50'
                  }}>
                    {stat.icon}
                    <Typography 
                      variant="h4" 
                      fontFamily="Rubik" 
                      fontWeight={700}
                      color="white"
                    >
                      {stat.number}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    fontFamily="Rubik"
                    color="rgba(255,255,255,0.8)"
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontFamily="Rubik"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              JobPortal
            </Typography>
            <Typography
              variant="body1"
              sx={{ 
                mb: 3, 
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                fontFamily: 'Rubik'
              }}
            >
              Найкращий портал для пошуку роботи в Україні. 
              Ми допомагаємо талановитим людям знаходити роботу мрії, 
              а компаніям - ідеальних співробітників.
            </Typography>
            
            {/* Contact Info */}
            <Box sx={{ mb: 3 }}>
              {contactInfo.map((contact, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  mb: 1,
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {contact.icon}
                  <Link
                    href={contact.href}
                    color="inherit"
                    underline="hover"
                    sx={{ fontFamily: 'Rubik' }}
                  >
                    {contact.text}
                  </Link>
                </Box>
              ))}
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white'
                    }
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={8} sx={{width: "100%"}}>
            <Grid 
              container 
              direction="row"
              spacing={4} 
              sx={{
                justifyContent: "center",
                alignItems: "center"
            }}>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h6"
                  fontFamily="Rubik"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Шукачам
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.forJobSeekers.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="rgba(255,255,255,0.8)"
                      underline="hover"
                      sx={{ 
                        fontFamily: 'Rubik',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h6"
                  fontFamily="Rubik"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Роботодавцям
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.forEmployers.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="rgba(255,255,255,0.8)"
                      underline="hover"
                      sx={{ 
                        fontFamily: 'Rubik',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h6"
                  fontFamily="Rubik"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Компанія
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.company.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="rgba(255,255,255,0.8)"
                      underline="hover"
                      sx={{ 
                        fontFamily: 'Rubik',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h6"
                  fontFamily="Rubik"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Підтримка
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.support.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="rgba(255,255,255,0.8)"
                      underline="hover"
                      sx={{ 
                        fontFamily: 'Rubik',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box sx={{ backgroundColor: '#0f1617', py: 3 }}>
        <Container maxWidth="lg">
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.6)"
              sx={{ fontFamily: 'Rubik' }}
            >
              © 2025 JobPortal. Всі права захищені.
            </Typography>
            <Box sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-end'
            }}>
              <Link
                href="/privacy"
                color="rgba(255,255,255,0.6)"
                underline="hover"
                sx={{ 
                  fontFamily: 'Rubik',
                  fontSize: '14px',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.8)'
                  }
                }}
              >
                Політика конфіденційності
              </Link>
              <Link
                href="/terms"
                color="rgba(255,255,255,0.6)"
                underline="hover"
                sx={{ 
                  fontFamily: 'Rubik',
                  fontSize: '14px',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.8)'
                  }
                }}
              >
                Умови використання
              </Link>
              <Link
                href="/cookies"
                color="rgba(255,255,255,0.6)"
                underline="hover"
                sx={{ 
                  fontFamily: 'Rubik',
                  fontSize: '14px',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.8)'
                  }
                }}
              >
                Cookies
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;