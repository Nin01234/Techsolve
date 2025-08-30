-- Create categories for problems
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create problems table
CREATE TABLE public.problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    problem_type TEXT CHECK (problem_type IN ('hardware', 'software', 'network', 'security')) NOT NULL,
    image_url TEXT,
    symptoms TEXT[],
    common_causes TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create solutions table
CREATE TABLE public.solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    steps JSONB NOT NULL, -- Array of step objects with text and optional image
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    estimated_time TEXT,
    success_rate INTEGER CHECK (success_rate >= 0 AND success_rate <= 100),
    youtube_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create guides table
CREATE TABLE public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content JSONB NOT NULL, -- Rich content with steps, images, videos
    category_id UUID REFERENCES public.categories(id),
    author_name TEXT,
    read_time INTEGER, -- in minutes
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    tags TEXT[],
    image_url TEXT,
    youtube_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create video tutorials table
CREATE TABLE public.video_tutorials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    youtube_id TEXT NOT NULL,
    thumbnail_url TEXT,
    duration TEXT,
    category_id UUID REFERENCES public.categories(id),
    problem_id UUID REFERENCES public.problems(id),
    views INTEGER DEFAULT 0,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hero slides table for dynamic content
CREATE TABLE public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    button_text TEXT DEFAULT 'Get Started',
    button_link TEXT DEFAULT '/chat',
    icon TEXT,
    bg_gradient TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Problems are viewable by everyone" ON public.problems FOR SELECT USING (true);
CREATE POLICY "Solutions are viewable by everyone" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Guides are viewable by everyone" ON public.guides FOR SELECT USING (true);
CREATE POLICY "Video tutorials are viewable by everyone" ON public.video_tutorials FOR SELECT USING (true);
CREATE POLICY "Hero slides are viewable by everyone" ON public.hero_slides FOR SELECT USING (true);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_problems_updated_at BEFORE UPDATE ON public.problems FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_solutions_updated_at BEFORE UPDATE ON public.solutions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON public.guides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, description, icon, color) VALUES
('Hardware Issues', 'Computer hardware problems and repairs', 'Cpu', 'hsl(var(--primary))'),
('Software Problems', 'Operating system and application issues', 'Monitor', 'hsl(var(--secondary))'),
('Network & Internet', 'Connectivity and network troubleshooting', 'Wifi', 'hsl(var(--accent))'),
('Security & Malware', 'Virus removal and security issues', 'Shield', 'hsl(var(--destructive))'),
('Performance Issues', 'Speed and optimization problems', 'Zap', 'hsl(var(--warning))'),
('Mobile Devices', 'Smartphone and tablet issues', 'Smartphone', 'hsl(var(--success))');

-- Insert sample hero slides
INSERT INTO public.hero_slides (title, subtitle, description, image_url, button_text, button_link, icon, bg_gradient, order_index) VALUES
('AI-Powered Tech Support', 'Get Instant Solutions', 'Our intelligent assistant analyzes your tech problems and provides step-by-step solutions with 98% accuracy rate', '/src/assets/hero-ai-assistant.jpg', 'Start Chat', '/chat', 'Bot', 'from-blue-600/20 to-purple-600/20', 1),
('Hardware Repair Lab', 'Professional Diagnostics', 'Learn to diagnose and fix computer hardware issues with our comprehensive repair guides and video tutorials', '/src/assets/hero-repair-lab.jpg', 'View Guides', '/guides', 'Wrench', 'from-green-600/20 to-blue-600/20', 2),
('Expert Workspace', 'Advanced Solutions', 'Access professional-grade troubleshooting tools and connect with our community of tech experts', '/src/assets/hero-tech-workspace.jpg', 'Explore Tools', '/diagnostics', 'Settings', 'from-orange-600/20 to-red-600/20', 3),
('Video Tutorials', 'Visual Learning', 'Watch detailed video guides covering everything from basic maintenance to advanced repairs', '/src/assets/hero-ai-assistant.jpg', 'Watch Videos', '/videos', 'Play', 'from-purple-600/20 to-pink-600/20', 4),
('Community Support', 'Connect & Share', 'Join thousands of users sharing solutions and getting help from experienced technicians', '/src/assets/hero-repair-lab.jpg', 'Join Community', '/community', 'Users', 'from-teal-600/20 to-cyan-600/20', 5);