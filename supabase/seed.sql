-- Seeds the schema with the content already verified in
-- src/lib/content/data.ts, so the admin portal starts populated instead of
-- empty. Run after schema.sql, once, in the Supabase SQL Editor.

insert into site_settings (id, site_name, site_short_name, vision_statement, vision_statement_short, email, phone, address_venue_name, address_line1, address_line2, address_landmark)
values (
  1,
  'His Grace Anglican Church, Chevron',
  'HGAC Chevron',
  'Raising leaders that will transform the world through the Word of God and the Spirit.',
  'Raising leaders that transform the world through the Word of God.',
  'hgacchevron@gmail.com',
  '',
  'The Event Hall, Limeridge Hotel',
  'Plot 10, Chevron Drive',
  'Lekki, Lagos',
  'Immediately after Ebeano Supermarket'
)
on conflict (id) do nothing;

insert into diocese_info (id, province_name, diocese_name, diocese_founded, bishop_name, bishop_title, archdeaconry_name, archdeaconry_official_spelling, archdeacon_name, archdeacon_title, archdeaconry_headquarters)
values (
  1,
  'Church of Nigeria (Anglican Communion)',
  'Diocese of Lagos',
  '10 December 1919',
  'The Rt. Rev''d Dr. Ifedola Senasu Gabriel Okupevi',
  'Bishop of Lagos',
  'Peninsular Archdeaconry',
  'Pennisula Archdeaconry',
  'The Ven. Dr. Stephen Adebusuyi Adeyemi',
  'Archdeacon, Pennisula Archdeaconry',
  'St. Peter''s Church, Ikota'
)
on conflict (id) do nothing;

insert into social_links (platform, url, handle, order_index) values
  ('facebook', 'https://www.facebook.com/hgacchevron/', 'hgacchevron', 0),
  ('instagram', 'https://www.instagram.com/hgacchevron/', '@hgacchevron', 1),
  ('youtube', 'https://www.youtube.com/@hgacchevron', '@hgacchevron', 2);

insert into service_times (day, time, name, mode, is_main_service, order_index) values
  ('Sunday', '8:30 AM', 'Main Service', 'In-Person & Online', true, 0),
  ('Tuesday', '6:30 PM', 'Altar of Fire', 'Online', false, 1),
  ('Thursday', '6:30 PM', 'Word Clinic', 'Online', false, 2);

insert into leadership (slug, name, title, role, order_index) values
  ('innocent-jiji', 'Revd Engr. Innocent Jiji', 'Pioneer Vicar', 'vicar', 0),
  ('ivory-jiji', 'Mrs. Ivory Jiji', 'Vicar''s Wife', 'clergy-wife', 1);

insert into giving_accounts (purpose, bank_name, account_number, order_index) values
  ('Offering', 'First Bank', '2040419406', 0),
  ('Project / Land Fund', 'Zenith Bank', '1217491696', 1);

insert into events (slug, title, date_label, time_label, location, description, is_flagship, order_index) values
  ('harvest-thanksgiving-2026', '2026 Harvest Thanksgiving: The Extraordinary', 'Sunday, 25 October 2026', '9:00 AM', 'The Event Hall, Limeridge Hotel, Chevron Drive, Lekki',
   'Our 2026 Harvest Thanksgiving, themed "The Extraordinary." Please pray and plan to attend. Harvest Vow forms are available to pick up and share with friends, and personalised invitation letters can be requested for anyone you''d like to invite.',
   true, 0),
  ('grace-conference', 'Grace Conference', 'Annual', null, null,
   'HGAC Chevron''s flagship annual conference, drawing the congregation together for days of ministration, worship, and the Word.',
   true, 1),
  ('towdah', 'TOWDAH', 'Annual, held alongside Grace Conference', null, null,
   'A dedicated night within Grace Conference, streamed live to the online congregation.',
   true, 2);

insert into ministries (slug, name, tagline, description, status, order_index) values
  ('grace-voices', 'Grace Voices', 'The music and worship ministry',
   'The church''s choir and worship team, leading the congregation in song across Sunday services and special programs.', 'active', 0),
  ('prayer-ministry', 'Prayer Ministry', 'Altar of Fire & intercession',
   'The intercessory backbone of the church, anchoring the weekly Altar of Fire prayer service and standing in the gap for the congregation.', 'active', 1),
  ('leadership-development', 'Leadership Development', 'Raising leaders for tomorrow',
   'Discipleship and training rooted in the church''s vision of raising leaders who transform the world through the Word and the Spirit.', 'active', 2);

insert into history_timeline (date_label, title, description, order_index) values
  ('8 August 2026', 'HGAC Chevron Inaugurated',
   'His Grace Anglican Church, Chevron was formally inaugurated under the Diocese of Lagos, with Revd Engr. Innocent Jiji installed as Pioneer Vicar.', 0),
  ('2026', 'Temporary Worship Home',
   'The congregation began gathering at The Event Hall, Limeridge Hotel, Plot 10 Chevron Drive, Lekki, its temporary worship venue while a permanent site is developed.', 1),
  ('Ongoing', 'Vision for a Permanent Site',
   'The church is building toward a permanent home, supported by the congregation''s giving toward the Project / Land Fund.', 2);

insert into faqs (question, answer, order_index) values
  ('What should I wear?', 'Come as you are: smart casual is perfectly welcome. Many members dress a little more formally for Sunday service, but you''ll be warmly received either way.', 0),
  ('Is there parking at the venue?', 'We currently worship at The Event Hall, Limeridge Hotel on Chevron Drive. Contact us before your visit and our welcome team will help you with parking on arrival.', 1),
  ('Is there a program for children?', 'We''re growing our children''s ministry offering as the church develops. Reach out to our welcome team ahead of your visit so we can let you know what''s currently available for your family.', 2),
  ('How long is the service?', 'Sunday service begins at 8:30 AM and follows Anglican liturgy: expect a service rich in worship, scripture, and the Word, typically running a couple of hours.', 3),
  ('Who do I meet when I arrive?', 'Our welcome team will be at the entrance to greet you, help you find a seat, and answer any questions: just look for a friendly face at the door.', 4);

insert into gallery_images (category, order_index) values
  ('Worship', 0),
  ('Worship', 1),
  ('Grace Conference', 2),
  ('Grace Conference', 3),
  ('Grace Voices', 4),
  ('Grace Voices', 5),
  ('Fellowship', 6),
  ('Fellowship', 7);

insert into hero_slides (slug, eyebrow, title, description, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href, order_index) values
  ('harvest-thanksgiving', 'Save The Date · 25 October 2026', '2026 Harvest Thanksgiving: The Extraordinary',
   'Join us Sunday, 25 October 2026 by 9:00 AM. Please pray and plan to attend. Pick up a Harvest Vow form to share with friends, or request a personalised invitation letter.',
   'RSVP Now', '/events', 'Watch Live', '/watch-live', 0),
  ('vision', 'Anglican Diocese of Lagos · Chevron, Lekki', 'Raising leaders that will transform the world through the Word of God and the Spirit.',
   'His Grace Anglican Church, Chevron. Join us for worship every Sunday at 8:30 AM, in person at Chevron Drive, Lekki, or online wherever you are.',
   'Join Us Sunday', '/new-here', 'Watch Live', '/watch-live', 1),
  ('weekly', 'Every Week', 'Gather With Us, Wherever You Are',
   'Sunday worship, Tuesday''s Altar of Fire, and Thursday''s Word Clinic: every week is an invitation to grow in the Word and the Spirit.',
   'See Weekly Activities', '/#service-times', 'Watch Live', '/watch-live', 2),
  ('grace-conference', 'Signature Gatherings', 'Grace Conference & TOWDAH',
   'Our flagship gatherings: days set apart for ministration, worship, and thanksgiving, together as one church family.',
   'See All Events', '/events', 'Give Cheerfully', '/giving', 3);

-- Testimonials intentionally left empty: no real quotes were ever available
-- to seed (see the TODO that lived in data.ts) — add real ones via the admin.
