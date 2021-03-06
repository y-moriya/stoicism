require 'date'

now = DateTime.now
datestr = now.strftime("%Y-%m-%d")
title = ARGV[0]

if !title
  puts "Usage: ruby new.rb [title]"
  return
end

dir = "content/blog/" + datestr + "_" + title
Dir.mkdir(dir) unless Dir.exists?(dir)
f = File.open(dir+"/index.mdx", "w+")
f.puts("---\ntitle: #{title}\ndate: #{now.to_s}\n---")
f.close