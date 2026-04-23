/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Mail, ArrowRight, Sparkles, Rocket, Palette, BookOpen, 
  User, Home, Monitor, Search, Lightbulb, BarChart3, 
  Triangle, Square, Circle, Crown, Mic, Settings, Link as LinkIcon
} from 'lucide-react';

// --- 类型定义 ---
interface Tab {
  id: string;
  label: string;
  hoverColor: string;
}

// --- 通用 Tilt 组件 ---
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- 打字机效果组件 ---
const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="inline-block"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const tabs: Tab[] = [
    { id: 'home', label: '首页', hoverColor: 'yellow-400' },
    { id: 'about', label: '关于我', hoverColor: 'pink-400' },
    { id: 'projects', label: '我的项目', hoverColor: 'blue-400' },
    { id: 'knowledge', label: '知识库', hoverColor: 'purple-400' },
  ];

  // 视差背景元素
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-16 items-center mt-24 relative"
          >
            <div className="z-20">
              <h1 className="text-6xl lg:text-9xl font-black leading-[0.95] text-black">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block bg-pink-400 text-white px-8 py-3 border-8 border-black shadow-[12px_12px_0px_#000] -rotate-3 group cursor-pointer"
                >
                  HI!
                  <motion.div 
                    className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    style={{ clipPath: "circle(20% at center)" }}
                  />
                </motion.span>
                <br />
                我是张逸飞<br />
                <motion.span 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="inline-block bg-blue-500 text-white px-8 py-3 border-8 border-black shadow-[12px_12px_0px_#000] rotate-2 mt-4"
                >
                  Eyvi
                </motion.span>
              </h1>
              
              <div className="mt-20 flex flex-wrap gap-8">
                <button className="px-12 py-6 rounded-3xl border-8 border-black bg-black text-white font-black text-2xl shadow-[12px_12px_0px_#000] hover:bg-white hover:text-black hover:-translate-y-2 transition-all duration-300">
                  开始合作
                </button>
                <button className="px-12 py-6 rounded-3xl border-8 border-black bg-white font-black text-2xl shadow-[12px_12px_0px_#000] hover:bg-black hover:text-white hover:-translate-y-2 transition-all duration-300">
                  查看作品
                </button>
              </div>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
              {/* 粒子物理场占位动画 */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      x: [Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10],
                      y: [Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10],
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    {i % 3 === 0 ? <Triangle size={24} fill="currentColor" /> : i % 3 === 1 ? <Square size={24} fill="currentColor" /> : <Circle size={24} fill="currentColor" />}
                  </motion.div>
                ))}
              </div>

              <TiltCard className="w-full max-w-lg z-10">
                <motion.div
                  className="relative bg-white border-8 border-black rounded-[4rem] shadow-[20px_20px_0px_#000] aspect-square overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-500 animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 4 } }}
                    className="absolute inset-16 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/40 flex items-center justify-center"
                  >
                    <Sparkles size={160} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                </motion.div>
              </TiltCard>
            </div>
          </motion.section>
        );

      case 'about':
        return (
          <motion.section
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-24 space-y-24 pb-32"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <TiltCard>
                <div className="p-12 rounded-[4rem] border-8 border-black bg-white shadow-[15px_15px_0px_#000] h-full">
                  <span className="inline-block bg-yellow-400 px-8 py-3 border-4 border-black font-black text-2xl shadow-[6px_6px_0px_#000] mb-8">WHO AM I?</span>
                  <h2 className="text-5xl font-black mb-8 leading-tight">设计、商业、内容的融合者</h2>
                  <p className="text-2xl leading-[1.6] text-gray-800 font-bold">
                    将隐性认知具象化。通过策略内容与极致视觉，塑造具有爆发力的品牌场域。
                  </p>
                </div>
              </TiltCard>
              <TiltCard>
                <div className="rounded-[4rem] border-8 border-black bg-purple-600 shadow-[15px_15px_0px_#000] h-full flex items-center justify-center relative overflow-hidden group">
                  <motion.div 
                    whileHover={{ y: -20, scale: 1.1 }}
                    className="relative z-10"
                  >
                    <Rocket size={220} className="text-white drop-shadow-[10px_10px_0px_#000]" />
                  </motion.div>
                  {/* 分层装饰 */}
                  <div className="absolute inset-0 bg-dots opacity-20" />
                </div>
              </TiltCard>
            </div>

            <div className="max-w-4xl mx-auto w-full relative">
              <h3 className="text-5xl font-black mb-20 text-center tracking-tighter">THE GROWTH ARCHIVE</h3>
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 h-full w-4 bg-black rounded-full" />
              
              {[
                { year: '2018', text: '开启设计生涯', color: 'bg-yellow-400', icon: <Palette size={32} /> },
                { year: '2020', text: '探索商业逻辑', color: 'bg-pink-400', icon: <BarChart3 size={32} /> },
                { year: '2022', text: '融合内容策略', color: 'bg-blue-500', icon: <Mic size={32} /> },
                { year: '2024', text: '成立个人品牌', color: 'bg-purple-500', icon: <Crown size={32} /> }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center mb-24 w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`hidden md:block w-[45%] ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-8 border-8 border-black rounded-[2.5rem] ${item.color} shadow-[10px_10px_0px_#000]`}>
                      <span className="font-black text-4xl block mb-2">{item.year}</span>
                      <p className="font-black text-2xl uppercase tracking-tighter">{item.text}</p>
                    </div>
                  </div>
                  {/* 节点图标 */}
                  <motion.div 
                    whileInView={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
                    className={`z-10 w-16 h-16 rounded-2xl border-4 border-black ${item.color} flex items-center justify-center shadow-[4px_4px_0px_#000] ml-[-8px] md:ml-0`}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="md:w-[45%] flex-1 pl-10 md:pl-0">
                    <div className={`md:hidden inline-block p-6 border-4 border-black rounded-2xl ${item.color} shadow-[6px_6px_0px_#000]`}>
                      <span className="font-black text-2xl block mb-1">{item.year}</span>
                      <p className="font-bold">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );

      case 'projects':
        return (
          <motion.section
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-24 space-y-20 pb-40"
          >
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ marginLeft: `${index * 8}%` }}
                className="group relative"
              >
                {/* 连接线 */}
                {index < 2 && (
                  <div className="absolute -bottom-24 left-1/4 transform -translate-x-1/2 z-0 hidden lg:block">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Settings className="text-black opacity-10" size={100} />
                    </motion.div>
                  </div>
                )}

                <TiltCard>
                  <div className="grid md:grid-cols-[240px_1fr_300px] border-8 border-black rounded-[4rem] bg-white shadow-[15px_15px_0px_#000] overflow-hidden items-center">
                    <motion.div 
                      className="p-12 border-r-8 border-black bg-gray-50 flex items-center justify-center h-full group-hover:bg-yellow-400 transition-colors"
                    >
                      <span className="bg-black text-white px-6 py-3 border-4 border-black rounded-2xl font-black text-xl rotate-[-5deg]">CASE 0{item}</span>
                    </motion.div>
                    
                    <div className="p-12">
                      <h3 className="text-4xl lg:text-5xl font-black mb-8">AI-Powered IP Ecosystem</h3>
                      <button className="flex items-center gap-4 px-10 py-5 border-8 border-black rounded-3xl bg-yellow-400 font-black text-xl shadow-[8px_8px_0px_#000] hover:bg-black hover:text-white transition-all">
                        LEARN MORE <ArrowRight size={24} />
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-full min-h-[300px] flex items-center justify-center border-l-8 border-black relative group-hover:from-blue-200">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                      >
                        <Monitor size={140} className="text-blue-600 drop-shadow-[5px_5px_0px_black]" />
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.section>
        );

      case 'knowledge':
        return (
          <motion.section
            key="knowledge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-24 pb-48"
          >
            <div className="text-center mb-24 relative">
              <h2 className="text-7xl lg:text-9xl font-black mb-4 tracking-tighter uppercase">Vault</h2>
              <div className="w-64 h-6 bg-pink-400 mx-auto border-4 border-black -rotate-1" />
              
              {/* 装饰图标 */}
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute -top-10 left-10 opacity-10">
                <Settings size={120} />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: 'AI提示词工程', desc: '高效控制AI生成的核心技巧。', icon: <Search /> },
                { title: '默会知识方法论', desc: '将隐性知识显性化的系统框架。', icon: <Lightbulb /> },
                { title: '个人品牌打造', desc: '差异化价值主张的系统构建。', icon: <Crown /> },
                { title: '商业变现逻辑', desc: '价值交换与赢利模式的路径。', icon: <BarChart3 /> },
                { title: '内容策划', desc: '基于用户心理的内容叙事设计。', icon: <BookOpen /> },
                { title: '短视频脚本', desc: '高转化率短视频的结构化剧本。', icon: <Monitor /> },
                { title: '用户洞察', desc: '精准捕捉用户痛点与隐性需求。', icon: <Search /> },
                { title: '网站设计', desc: '用户体验与视觉传达的数智化载体。', icon: <Palette /> }
              ].map((item, index) => {
                const bgStyles = ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-white'];

                return (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      rotate: index % 2 === 0 ? 0.5 : -0.5 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`h-full aspect-square rounded-[3rem] border-8 border-black shadow-[12px_12px_0px_#000] p-10 flex flex-col items-center justify-center cursor-pointer transition-colors group ${bgStyles[index % 4]}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl border-4 border-black bg-white mb-6 flex items-center justify-center transition-transform"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-2xl font-black mb-4 text-center">{item.title}</h3>
                    <p className="font-bold text-center leading-relaxed text-sm lg:text-base">
                      <TypewriterText text={item.desc} delay={0.1} />
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#ececec] px-8 py-12 md:px-20 font-sans relative overflow-x-hidden bg-grid">
      {/* 视差背景几何层 */}
      <motion.div 
        style={{ y: backgroundY, rotate: backgroundRotate }}
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 flex items-center justify-center"
      >
        <Triangle size={1000} className="text-black" strokeWidth={40} />
      </motion.div>

      <nav className="max-w-6xl mx-auto bg-white border-8 border-black rounded-[2.5rem] px-10 py-6 shadow-[15px_15px_0px_#000] flex justify-between items-center relative z-50">
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="flex items-center gap-4 cursor-pointer"
        >
            <div className="w-16 h-16 rounded-2xl border-4 border-black bg-yellow-400 flex items-center justify-center rotate-6 shadow-[5px_5px_0px_#000]">
                <span className="font-black text-3xl">Z.</span>
            </div>
            <span className="hidden lg:inline font-black text-3xl tracking-tighter">EYVI STUDIO</span>
        </motion.div>
        
        <div className="flex gap-8 lg:gap-12 font-black text-xl uppercase">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative group transition-all"
            >
              <span className={`pb-2 ${activeTab === tab.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                {tab.label}
              </span>
              <motion.div 
                className={`absolute bottom-0 left-0 h-2 bg-${tab.hoverColor} border-2 border-black`}
                initial={false}
                animate={{ 
                  width: activeTab === tab.id ? "100%" : "0%",
                  opacity: activeTab === tab.id ? 1 : 0
                }}
              />
              {/* 悬停时的特殊彩色线 */}
              <div className={`absolute bottom-0 left-0 w-0 h-2 bg-${tab.hoverColor} group-hover:w-full transition-all duration-300 opacity-60`} />
            </button>
          ))}
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-black text-white rounded-[1.5rem] border-4 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
        >
          <Mail size={32} />
        </motion.button>
      </nav>

      <main className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      
      <footer className="max-w-6xl mx-auto mt-48 border-t-[12px] border-black pt-16 pb-32 flex flex-col lg:flex-row justify-between items-end gap-12 relative z-10">
        <div className="flex flex-col gap-4">
            <motion.span 
              whileHover={{ x: 20 }}
              className="font-black text-6xl lg:text-8xl tracking-[10px] uppercase"
            >
              Think Big
            </motion.span>
            <p className="font-black text-gray-500 uppercase tracking-[15px] text-sm">Visual Strategy • Kinetic Design</p>
        </div>
        <div className="flex gap-12 font-black text-3xl">
            <motion.a whileHover={{ y: -10, color: '#f472b6' }} href="#">TW</motion.a>
            <motion.a whileHover={{ y: -10, color: '#3b82f6' }} href="#">GH</motion.a>
            <motion.a whileHover={{ y: -10, color: '#a855f7' }} href="#">LI</motion.a>
        </div>
      </footer>
    </div>
  );
}


