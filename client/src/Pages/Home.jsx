import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Globe, 
  FileText, 
  ClipboardList, 
  BarChart, 
  Server, 
  Cpu, 
  Brain, 
  Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getServerHealth } from '@/services/api.services';

export default function GoAbroadLandingPage() {
  const [serverStatus, setServerStatus] = useState({
    application: {
      environment: 'development',
      uptime: 'loading...',
      memoryUsage: {
        heapTotal: 'loading...',
        heapUsed: 'loading...'
      }
    },
    system: {
      cpuUsage: [0, 0, 0],
      totalMemory: '1',
      freeMemory: '1'
    },
    timestamp: Date.now()
  });

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await getServerHealth();

        // Update state with nested data only
        if (response.data?.success) {
          setServerStatus(response.data.data);
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error);
        setIsOnline(false);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const memoryPercent = ((1 - parseFloat(serverStatus.system.freeMemory) / parseFloat(serverStatus.system.totalMemory)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">Go Abroad</span>
          </div>
          <div className="flex items-center gap-4">
            <ServerStatusIndicator status={isOnline} />
            <Button>Sign Up Free</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Journey to <span className="text-blue-600">Study Abroad</span> Starts Here
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive platform that simplifies the entire process from college shortlisting to application tracking.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Streamline Your Study Abroad Journey
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <FeatureCard icon={<Globe className="h-10 w-10 text-blue-600" />} title="Dream College Management" variants={fadeIn} />
            <FeatureCard icon={<FileText className="h-10 w-10 text-blue-600" />} title="Document Assistance" variants={fadeIn} />
            <FeatureCard icon={<ClipboardList className="h-10 w-10 text-blue-600" />} title="Form Filling Support" variants={fadeIn} />
            <FeatureCard icon={<BarChart className="h-10 w-10 text-blue-600" />} title="Status Management" variants={fadeIn} />
          </motion.div>
        </div>
      </section>

      <section id="server-status" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            System Health & Performance
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ServerMetricCard 
              icon={<Server className="h-10 w-10 text-green-600" />}
              title="Server Status"
              value={isOnline ? 'Online' : 'Offline'}
              status={isOnline ? 'good' : 'critical'}
              variants={fadeIn}
            />
            <ServerMetricCard 
              icon={<Cpu className="h-10 w-10 text-blue-600" />}
              title="CPU Load"
              value={`${(serverStatus.system.cpuUsage[0] * 100).toFixed(1)}%`}
              status={serverStatus.system.cpuUsage[0] < 0.7 ? 'good' : serverStatus.system.cpuUsage[0] < 0.9 ? 'warning' : 'critical'}
              variants={fadeIn}
            />
            <ServerMetricCard 
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="Memory Usage"
              value={`${memoryPercent}%`}
              status={memoryPercent < 70 ? 'good' : memoryPercent < 90 ? 'warning' : 'critical'}
              variants={fadeIn}
            />
            <ServerMetricCard 
              icon={<Clock className="h-10 w-10 text-amber-600" />}
              title="Uptime"
              value={serverStatus.application.uptime}
              status="info"
              variants={fadeIn}
            />
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Last updated: {new Date(serverStatus.timestamp).toLocaleTimeString()}
          </motion.div>
        </div>
      </section>

      <motion.section className="bg-blue-600 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Study Abroad Journey?</h2>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">Sign Up Now</Button>
          </motion.div>
        </div>
      </motion.section>

      <section id="tech-stack" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            Built with Modern Technology
          </motion.h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto" variants={staggerContainer} initial="hidden" animate="visible">
            <TechStackItem name="Node.js" variants={fadeIn} />
            <TechStackItem name="React.js" variants={fadeIn} />
            <TechStackItem name="MongoDB" variants={fadeIn} />
            <TechStackItem name="Docker" variants={fadeIn} />
            <TechStackItem name="ShadCN UI" variants={fadeIn} />
            <TechStackItem name="Express" variants={fadeIn} />
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Go Abroad</span>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} Go Abroad. Maintained by EasyTechInnovate.</p>
        </div>
      </footer>
    </div>
  );
}

// Components
function FeatureCard({ icon, title, variants }) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full">
        <CardHeader className="text-center">
          <motion.div className="mx-auto mb-4" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
            {icon}
          </motion.div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

function ServerMetricCard({ icon, title, value, status, variants }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-amber-600';
      case 'critical': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <motion.div variants={variants}>
      <Card className="h-full">
        <CardHeader>
          <motion.div className="mx-auto mb-2" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            {icon}
          </motion.div>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <span className={`text-2xl font-bold ${getStatusColor(status)}`}>{value}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TechStackItem({ name, variants }) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full">
        <CardHeader className="text-center py-4">
          <CardTitle className="text-sm">{name}</CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

function ServerStatusIndicator({ status }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-sm font-medium">{status ? 'System Online' : 'System Offline'}</span>
    </div>
  );
}

// PropTypes
FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  variants: PropTypes.object,
};

ServerMetricCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  variants: PropTypes.object,
};

TechStackItem.propTypes = {
  name: PropTypes.string.isRequired,
  variants: PropTypes.object,
};

ServerStatusIndicator.propTypes = {
  status: PropTypes.bool.isRequired,
};
