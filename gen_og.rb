files = Dir.glob("content/blog/*/index.mdx")
files.each do |file|
  f = File.open(file)
  str = f.read
  m = str.match(/## (.+)$/)
  next unless m
  str.sub!('"og_title"', m[1])
  f = File.open(file, "w")
  f.write(str)
end