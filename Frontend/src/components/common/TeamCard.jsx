import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from 'lucide-react';

const TeamCard = ({ 
  name, 
  position, 
  image, 
  bio,
  socialLinks = {} 
}) => {
  const { facebook, twitter, linkedin, instagram } = socialLinks;

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white border border-gray-200">
      {/* Team Member Image */}
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600 mb-3">{position}</p>
        
        {bio && <p className="text-gray-700 mb-4">{bio}</p>}
        
        {/* Social Links */}
        <div className="flex space-x-3">
          {facebook && (
            <a 
              href={facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label={`${name}'s Facebook`}
            >
              <Facebook className="h-5 w-5" />
            </a>
          )}
          
          {twitter && (
            <a 
              href={twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label={`${name}'s Twitter`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          
          {instagram && (
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label={`${name}'s Instagram`}
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// A grid of team members
export const TeamGrid = ({ members }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <TeamCard
          key={member.id || member.name}
          {...member}
        />
      ))}
    </div>
  );
};

export default TeamCard;
