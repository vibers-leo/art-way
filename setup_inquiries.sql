
-- 문의하기/신청하기 테이블
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL, -- 'general' (일반문의), 'exhibition' (전시신청)
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- 'new' (신규), 'read' (확인), 'done' (완료)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
rP